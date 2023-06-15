import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick, movies }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} />
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
            <button onClick={onBackClick}>Back</button>
        </div>
    );

};

MovieView.propTypes = {
    movie: PropTypes.shape({
        featured: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};