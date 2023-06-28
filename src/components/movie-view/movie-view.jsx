import PropTypes from "prop-types";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

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
            <Link to={`/`}>
                <Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
            </Link>
        </div>
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