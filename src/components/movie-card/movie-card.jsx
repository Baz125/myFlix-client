import PropTypes from "prop-types";

//Function Component
export const MovieCard = ({ movie, onMovieClick }) => {
    console.log("Movie:", movie);
    // console.log("Title:", movie && movie.title);

    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};

//Define all prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};