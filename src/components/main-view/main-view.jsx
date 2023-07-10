import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import countdown from "../../../assets/countdown.gif";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [moviesFromApi, setMoviesFromApi] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    } 

    useEffect(() => {
        console.log("user: ", user);
    }, [user]);
    
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
        
            fetch("https://moviedb125.herokuapp.com/users/"+username, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => response.json())
            .then((res) => {console.log(res); return res})
            .then((data) => setUser(data))
            .catch(err => console.log("problem with user fetch")) 
        
    }, [token, user]);

        //updates the list of favorite movies within the user state
        const updateFavorites = (movieId) => {
        // if the movie is already in the favorites list, remove it
        // if not, add it

        const updatedFavMovies = favoriteMovies.filter(m => m.id === movieId).length ? favoriteMovies.filter(movie => movie.id !== movieId) : favoriteMovies.concat(movies.find(m => m.id === movieId));

        setFavoriteMovies(updatedFavMovies);    
    }

        //fetch favourite movies
        useEffect(() => {
            if (!token) {
                return;
            }
            setFavoriteMovies(movies.filter(m => user.FavoriteMovies.includes(m.id))); // Ren: Instead of filling it while declaring, we moved it useEffect, so that once movie is available, the setFavoriteMovies is called and that causes rerendering.
        }, [token,movies]); // Ren: Listening for movies props, resolved FavMovies not loaded sometimes issue.

    
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
                                        <MovieView
                                                movies={movies}
                                                user={user}
                                                token={token}
                                                favoriteMovies={favoriteMovies}
                                                updateFavorites={updateFavorites}
                                            />
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
                                                favoriteMovies={favoriteMovies}
                                                onFavoriteChange={updateFavorites}
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
                                                <MovieCard onClick
                                                    movie={movie}
                                                    user={user}
                                                    token={token}
                                                    updateUserMovies={updateFavorites}//this is going to have to change
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
