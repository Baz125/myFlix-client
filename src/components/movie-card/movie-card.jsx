import { useEffect, useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

//Function Component
export const MovieCard = ({ movie, user, token }) => {

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
        >
            <Card.Body>
                <Card.Img variant="top" src={movie.image} />
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.actors.join(" & ")}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
                <Button onClick={handleAddFavorite} variant="info">Add to Favorites</Button>
                <Button onClick={handleRemoveFavorite} variant="info">Remove from Favourites</Button>
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
    };