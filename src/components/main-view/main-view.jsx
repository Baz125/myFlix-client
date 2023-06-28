import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(storedToken);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://moviedb125.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
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
                        releaseyear: doc.ReleaseYear,
                        image: doc.ImagePath
                    };
                });
                setMovies(moviesFromApi);
            })
            .catch(err => console.log("not authorized"))
            
    }, [token]);

// I needed to move these functions and variable declarations above the return, 
//because function and variable declarations are not allowed inside JSX code blocks/
// In doing so I created an error that selctedMovie movie was undefined
// in line 60. the fix was to replace the following line with the one below ->let similarMovies = movies.filter(checkGenre);    
    
    const similarMovies = selectedMovie
    ? movies.filter((movie) => checkGenre(movie))
    : [];

    function checkGenre(movies) {
        return selectedMovie.genre.Name === movies.genre.Name;
   }

    return (
        <Row className="justify-content-md-center">
            {!token ? (
                    <Col md={5}>
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                            }}
                        />
                        or
                        <SignupView />
                    </Col>
            ) : selectedMovie ? (

            <>
                <Col md={8} className="mx-auto">
                    <MovieView
                        style={{ border: "1px solid green" }}
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)} />
                </Col>
                <hr />
                <h2> SimilarMovies</h2>
                    {similarMovies.map((movie) => (
                    <Col key={movie.id} md={3}>
                        <MovieCard
                            style={{ border: "1px solid green" }}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </Col>
                ))}
            </>
            ) : movies.length === 0 ? (
                <div> The list is empty</div>
            ) : (
                <>
                        {movies.map((movie) => (
                            <Col className="mb-5" key={movie.id} md={3}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        ))}

                 <Button variant="danger" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                 </>
            )}          
        </Row>
    );
};