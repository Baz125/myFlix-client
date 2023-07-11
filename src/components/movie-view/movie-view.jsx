import PropTypes from "prop-types";
import { Button, Col, Row, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";
import "./movie-view.scss";

export const MovieView = ({ movies, token, updateFavorites, favoriteMovies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    const similarMovies = movies.filter(m => m.genre.Name === movie.genre.Name && m.id !== movie.id);

    return (
        <Container>
            <Row>
                <div>
                    <img src={movie.image} style={{ maxWidth: "500px", width: "100%" }} />
                </div>
                <div>
                    <span>Title: </span>
                    <span>{movie.title}</span>
                </div>
                <div>
                    <span>Description: </span>
                    <span>{movie.description}</span>
                </div>
                <div>
                    <span>Genre: </span>
                    <span>{movie.genre.Name}</span>
                </div>
                <div>
                    <span>Director: </span>
                    <span>{movie.director.Name}</span>
                </div>
                <Link to={`/`}>
                    <Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
                </Link>
            </Row>
            <hr />
            <Row>
            <h2> SimilarMovies</h2>
                {similarMovies.map((movie) => (
                    <Col text="light" className="mb-4" key={movie.id} md={4}>
                        <MovieCard
                            style={{ border: "1px solid green" }}
                            movie={movie}
                            token={token}
                            isFav={favoriteMovies.find(fav => fav.id === movie.id)}
                            updateFavorites={updateFavorites}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );

};

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         featured: PropTypes.bool.isRequired,
//         title: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         director: PropTypes.object
//     }).isRequired,
// };