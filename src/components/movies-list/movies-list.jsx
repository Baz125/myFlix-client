import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
    const { movies, filter } = useSelector((state) => state.movies);
        
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filter.trim().toLowerCase())
    );
        
    return (
        <>
            <Row>
                <MoviesFilter />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};