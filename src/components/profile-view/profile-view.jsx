import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProfileView = ({ user }) => {
    // const { movieId } = useParams();

    // const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <div>
                <span>Username: </span>
                <span>{user.Username}</span>
            </div>
            <div>
                <span>Email: </span>
                <span>{user.Email}</span>
            </div>
            <div>
                <span>Favourite Movies: </span>
                <span>{user.FavouriteMovies}</span>
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