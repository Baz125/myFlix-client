import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import countdown from "../../../assets/countdown.gif";
import { setFavoriteMovies, setMovies } from "../../redux/reducers/movies";
import { setToken, setUser } from "../../redux/reducers/user";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
    const {movies} = useSelector((state) => state.movies);
    const {user, token} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const updateUser = user => {
        dispatch(setUser(user));
    } 

    useEffect(() => {
        const username = localStorage.getItem('username');
        if(!username || !token) return;

        console.log('auth token', token)
        fetch("https://moviedb125.herokuapp.com/users/"+username, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((res) => {console.log(res); return res})
        .then((data) => dispatch(setUser(data)))

    }, [token])

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://moviedb125.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
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
                console.log('dispatch movies', moviesFromApi)

                
            })
            .catch(err => console.log("not authorized"))
            
    }, [token]);

    //sets favoriteMovies state, triggered any time token or movies changes.
    useEffect(() => {
        if (!token || !movies?.length || !user.FavoriteMovies) {
            return;
        }
        dispatch(setFavoriteMovies(movies.filter(m => user.FavoriteMovies.includes(m.id)))); // Instead of filling it while declaring, we moved it useEffect, so that once movie is available, the setFavoriteMovies is called and that causes rerendering.
    }, [token, movies, user]); // Listening for movies props, resolved FavMovies not loaded sometimes issue.

    
    return (    
        <BrowserRouter>
            <NavigationBar
                token={token}    
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
                                        <LoginView/>
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
                                                onLoggedOut={() => {
                                                    dispatch(setUser(null))
                                                    dispatch(setToken(null))
                                                    localStorage.clear();
                                                }}
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
                                ) : !movies?.length ? (
                                        <Col>
                                         <img src={countdown} />
                                        </Col>
                                    ) : (
                                            <>
                                                <h1 className="justify-content-md-center" text="light" >Click on a movie to learn more!</h1>
                                        {movies.map((movie) => (      
                                            <Col className="mb-4" key={movie.id} md={3} text="light">
                                                <MovieCard 
                                                    movie={movie}
                                                />
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
