import { useEffect, useState } from "react";
import "./movie-card.scss";
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


//Function Component
export const MovieCard = ({ movie, user, token, updateUserMovies, onFavoriteClick, favoriteMovies, onFavoriteChange }) => {
    const navigate = useNavigate();
    const handleCardClick = () => navigate(`/movies/${movie.id}`);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [isFav, setIsFav] = useState(storedUser.FavoriteMovies.includes(movie.id))



    const handleAddFavorite = (event) => {
        event.preventDefault();

        fetch(`https://moviedb125.herokuapp.com/users/${storedUser.Username}/movies/${encodeURIComponent(movie.id)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                alert(`${movie.title} has been added to your favorites!`);
                updateUserMovies(movie.id);
                onFavoriteClick(movie.id);
            } else {
                alert("something didn't work")
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleRemoveFavorite = (event) => {
        event.preventDefault();

        fetch(`https://moviedb125.herokuapp.com/users/${storedUser.Username}/movies/${encodeURIComponent(movie.id)}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                alert(`${movie.title} has been removed from your favorites!`);
                updateUserMovies(movie.id);
                onFavoriteClick(movie.id);
            } else {
                alert("something didn't work")
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Card className="h-100" text="light" bg="secondary">
            <div className="card-content">  
                <Card.Body>    
                    <div className="clickable-area" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                    <Card.Img variant="top" src={movie.image} />
                    <Card.Title>{movie.title}</Card.Title>
                    <div className="card-text-container">
                        <Card.Text>{movie.actors.join(" & ")}</Card.Text>
                        </div>
                    </div>
                    <div className="button-container">
                        {/* Ren: Added condition to show fav buttons */}
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

//Define all prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        genre: PropTypes.object,
        director: PropTypes.object
    }).isRequired,
    };