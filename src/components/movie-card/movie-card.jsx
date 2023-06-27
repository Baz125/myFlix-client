import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

//Function Component
export const MovieCard = ({ movie }) => {
    return (
        <Card
            className="h-100"
        >
            <Card.Body>
                <Card.Img variant="top" src={movie.image} />
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.actors.join(" & ")}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

//Define all prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        genre: PropTypes.object,
        director: PropTypes.object
    }).isRequired,
};