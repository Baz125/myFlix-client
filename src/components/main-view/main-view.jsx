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

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [moviesFromApi, setMoviesFromApi] = useState([]);

    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", user);
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
                setMovies(moviesFromApi);
                
            })
            .catch(err => console.log("not authorized"))
            
    }, [token]);

    return (    
        <BrowserRouter>
            <NavigationBar
                token={token}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}        
            />
            <Row className="justify-content-md-center">
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
                                        <MovieView movies={movies} />
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
                                                <MovieCard onClick movie={movie} user={user} token={token} />
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
