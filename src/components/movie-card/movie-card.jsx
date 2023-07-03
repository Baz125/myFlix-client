import { useEffect, useState } from "react";
import "./movie-card.scss";
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';


//Function Component
export const MovieCard = ({ movie, user, token }) => {
    const navigate = useNavigate();
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
            } else {
                alert("something didn't work")
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Card
            className="h-100"
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            {/* <Link to={`/movies/${movie.id}`} className="movie-card"> */}
            <div className="card-content">  
                <Card.Body>                     
                    <Card.Img variant="top" src={movie.image} />
                    <Card.Title>{movie.title}</Card.Title>
                    <div className="card-text-container">
                        <Card.Text>{movie.actors.join(" & ")}</Card.Text>
                    </div>
                    <div className="button-container">
                        <Button onClick={handleAddFavorite} variant="info">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        </Button>
                        <Button onClick={handleRemoveFavorite} variant="info">
                        <FontAwesomeIcon icon={faThumbsDown} />
                        </Button>   
                    </div>                       
                </Card.Body>
            </div>
            {/* </Link> */}
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