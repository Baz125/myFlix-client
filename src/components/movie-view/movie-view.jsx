import PropTypes from "prop-types";
import "./movie-view.scss";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, user, token, updateUserMovies }) => {
    const { movieId } = useParams();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const movie = movies.find((m) => m.id === movieId);

    const similarMovies = movies.filter(m => m.genre.Name === movie.genre.Name && m.id !== movie.id);

    //brought in from profile-view in an attamp to fix the issue of the favorites not updating the UI from moive-view
    const updateFavorites = (movieId) => {
        const updatedFavMovies = user.FavoriteMovies.includes(movieId) ? user.FavoriteMovies.filter(id => id !== movieId) : [...user.FavoriteMovies, movieId];
        updateUser({ ...user, FavoriteMovies: updatedFavMovies });
    }

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
                            user={user}
                            token={token}
                            updateUserMovies={updateFavorites}
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