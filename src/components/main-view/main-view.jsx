import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import countdown from "../../../assets/countdown.gif";
import { setMovies } from "../../redux/reducers/movies";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state) => state.user);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [moviesFromApi, setMoviesFromApi] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const dispatch = useDispatch();

    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    } 

    useEffect(() => {
        if(token && storedUsername)
        fetch("https://moviedb125.herokuapp.com/users/"+storedUsername, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((res) => {console.log(res); return res})
        .then((data) => setUser(data))
        .catch(err => console.log("problem with user fetch")) 
    
    }, []);


    
    useEffect(() => {
        // if (!token) {
        //     return;
        // }

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

    console.log("token:", token);

    const updateFavorites = (movieId) => {
        const updatedFavMovies = favoriteMovies.filter(m => m.id === movieId).length ? favoriteMovies.filter(movie => movie.id !== movieId) : favoriteMovies.concat(movies.find(m => m.id === movieId));
        setFavoriteMovies(updatedFavMovies);    
    }

    //sets favoriteMovies state, triggered any time token or movies changes.
    useEffect(() => {
        if (!token) {
            return;
        }
        setFavoriteMovies(movies.filter(m => user.FavoriteMovies.includes(m.id))); // Instead of filling it while declaring, we moved it useEffect, so that once movie is available, the setFavoriteMovies is called and that causes rerendering.
    }, [token,movies]); // Listening for movies props, resolved FavMovies not loaded sometimes issue.

    
    return (    
        <BrowserRouter>
            <NavigationBar
                token={token}
                // onLoggedOut={() => {
                //     setToken(null);
                //     localStorage.clear();
                // }}        
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
                                            // onLoggedIn={(token) => {
                                            //     setToken(token);
                                            // }}
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
                                                favoriteMovies={favoriteMovies}
                                                updateFavorites={updateFavorites}
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
                                                    token={token}
                                                    isFav={favoriteMovies.find(fav => fav.id === movie.id)}
                                                    updateFavorites={updateFavorites}
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
