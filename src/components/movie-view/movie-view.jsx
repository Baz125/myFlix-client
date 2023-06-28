import PropTypes from "prop-types";
import "./movie-view.scss";
import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick, movies }) => {
    return (
        <div>
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
            <Button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</Button>
        </div>
    );

};

MovieView.propTypes = {
    movie: PropTypes.shape({
        featured: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.object
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};