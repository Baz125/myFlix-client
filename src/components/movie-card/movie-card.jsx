import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addFavoriteMovie, removeFavoriteMovie } from '../../redux/reducers/movies';
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const {user, token} = useSelector((state) => state.user);
    const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
    const dispatch = useDispatch();

    const isFav = !!favoriteMovies?.length && favoriteMovies.find(fav => fav.id === movie.id);
    const handleCardClick = () => navigate(`/movies/${movie.id}`);

    const handleAddFavorite = (event) => {
        event.preventDefault();

        fetch(`https://moviedb125.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                alert(`${movie.title} has been added to your favorites!`);
                dispatch(addFavoriteMovie(movie))
            } else {
                alert("something didn't work")
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleRemoveFavorite = (event) => {
        event.preventDefault();

        
        fetch(`https://moviedb125.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                alert(`${movie.title} has been removed from your favorites!`);
                dispatch(removeFavoriteMovie(movie))
            
            } else {
                alert("something didn't work")
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    if(!movie) return null;

    return (
        <Card className="h-100" text="light" bg="secondary">
            <div className="card-content">  
                <Card.Body>    
                    <div className="clickable-area" onClick={handleCardClick} style={{ cursor: 'pointer', flexGrow: 1 }}>
                        <Card.Img variant="top" src={movie.image} />
                        <Card.Title>{movie.title}</Card.Title>
                        <div className="card-text-container">
                            <Card.Text>{movie.actors.join(" & ")}</Card.Text>
                        </div>
                    </div>
                    <div className="button-container">
                        {/* condition to show fav buttons */}
                        {!isFav ?
                            (<Button onClick={handleAddFavorite} variant="info">
                            <FontAwesomeIcon icon={faHeartRegular}  />
                            </Button>) 
                            :
                            (<Button onClick={handleRemoveFavorite} variant="info">
                            <FontAwesomeIcon icon={faHeart}  />
                            </Button>)
                        }
                    </div>                       
                </Card.Body>
            </div>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        genre: PropTypes.object,
        director: PropTypes.object
    }).isRequired,
    };