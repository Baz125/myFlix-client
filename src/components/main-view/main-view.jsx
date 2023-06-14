import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://moviedb125.herokuapp.com/movies")
            .then((response) => response.json())
            // .then((data) => {
            //     console.log("movies from api:", data);
            // })
            .then((data) => {
                const moviesFromApi = data.map((doc) => {
                    return {
                        id: doc._id,
                        title: doc.Title,
                        image: doc.ImagePath,
                        director: doc.Director,
                        description: doc.Description,
                        actors: doc.Actors,
                        genre: doc.Genre,
                        featured: doc.Featured,
                        releaseyear: doc.ReleaseYear 
                    };
                });
                setMovies(moviesFromApi);
            });
            
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div> The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }} 
                />
            ))}
        </div>
    );
};