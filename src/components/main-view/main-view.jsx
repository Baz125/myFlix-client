import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://moviedb125.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                console.log("movies from api:", data)
                return data
            })
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
        let similarMovies = movies.filter(checkGenre);

        function checkGenre(movies) {
            return selectedMovie.genre.Name === movies.genre.Name;
        }
        return (
            <>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                <hr />
                <h2> SimilarMovies</h2>
                {similarMovies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);    
                        }}
                />
                ))}
            </>
    )};

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