import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import countdown from "../../../assets/countdown.gif";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";

export const MovieView = () => {
    const movies = useSelector((state) => state.movies.movies);
    const { movieId } = useParams();
    

    const movie = movies.find((m) => m.id === movieId);
    
    if(!movie) return  <img src={countdown} fluid />

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
                            movie={movie}
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