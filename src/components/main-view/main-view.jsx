import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import countdown from "../../../assets/countdown.gif";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const movies = useSelector((state) => state.movies);
    const user = useSelector((state) => state.user);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [moviesFromApi, setMoviesFromApi] = useState([]);

    const dispatch = useDispatch();

    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    } 
    
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
                        releaseyear: doc.ReleaseYear
                    };
                });
                dispatch(setMovies(moviesFromApi));
                
            })
            .catch(err => console.log("not authorized"))
            
    }, [token, user]);

    const updateFavorites = (movieId) => {
        // if the movie is already in the favorites list, remove it
        // if not, add it
        const updatedFavMovies = user.FavoriteMovies.includes(movieId) ? user.FavoriteMovies.filter(id => id !== movieId) : [...user.FavoriteMovies, movieId];
        updateUser({ ...user, FavoriteMovies: updatedFavMovies });
        console.log("updated favs: ", updatedFavMovies);
    }

    return (    
        <BrowserRouter>
            <NavigationBar
                token={token}
                onLoggedOut={() => {
                    setToken(null);
                    localStorage.clear();
                }}        
            />
            <Row className="justify-content-md-center px-5">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {token ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {token ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!token ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                        <Col>
                                        <Image src={countdown} fluid />
                                        </Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView user={user} token={token} />
                                    </Col>
                                )}
                            </>
                        }
                    />      
                    <Route
                        path="/profile-view"
                        element={
                            <>
                                {!user ? (
                                    console.log("user not found"),
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                            <ProfileView
                                                movies={movies}
                                                user={user}
                                                token={token}
                                                onLoggedOut={() => {
                                                    setUser(null);
                                                    setToken(null);
                                                    localStorage.clear();
                                                }}
                                                updateUser={updateUser}
                                            />
                                    </Col>
                                )}
                            </>
                        }
                     />  
                    <Route
                        path="/"
                        element={
                            <>
                                {!token ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                        <Col>
                                         <img src={countdown} />
                                        </Col>
                                    ) : (
                                            
                                            <>
                                                <h1 className="justify-content-md-center" text="light" >Click on a movie to learn more!</h1>
                                        {movies.map((movie) => (      
                                            <Col className="mb-4" key={movie.id} md={3} text="light">
                                                <MovieCard onClick movie={movie} user={user} token={token} updateUserMovies={updateFavorites}/>
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    </Routes>
            </Row>
        </BrowserRouter>
    );
    
};

                // Older code below for later reference
                
                //         <Col md={5}>
                //             <LoginView
                //                 onLoggedIn={(user, token) => {
                //                     setUser(user);
                //                     setToken(token);
                //                 }}
                //             />
                //             or
                //             <SignupView />
                //         </Col>
                // ) : selectedMovie ? (

                // <>
                //     <Col md={8} className="mx-auto">
                //         <MovieView
                //             style={{ border: "1px solid green" }}
                //             movie={selectedMovie}
                //             onBackClick={() => setSelectedMovie(null)} />
                //     </Col>
                //     <hr />
                //     <h2> SimilarMovies</h2>
                //         {similarMovies.map((movie) => (
                //         <Col key={movie.id} md={3}>
                //             <MovieCard
                //                 style={{ border: "1px solid green" }}
                //                 movie={movie}
                //                 onMovieClick={(newSelectedMovie) => {
                //                     setSelectedMovie(newSelectedMovie);
                //                 }}
                //             />
                //         </Col>
                //     ))}
                // </>
                // ) : movies.length === 0 ? (
                //     <div> The list is empty</div>
                // ) : (
                //     <>
                //             {movies.map((movie) => (
                //                 <Col className="mb-5" key={movie.id} md={3}>
                //                     <MovieCard
                //                         movie={movie}
                //                         onMovieClick={(newSelectedMovie) => {
                //                             setSelectedMovie(newSelectedMovie);
                //                         }}
                //                     />
                //                 </Col>
                //             ))}

                //     <Button variant="danger" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                //     </>
                //     )}      
