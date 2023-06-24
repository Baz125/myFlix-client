import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

//Function Component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            <Card.Body>
                <Card.Img variant="top" src={movie.image} />
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.actors.join(" & ")}</Card.Text>
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
    onMovieClick: PropTypes.func.isRequired
};