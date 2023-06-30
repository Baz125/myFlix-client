import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({user, token, onLoggedOut, movies, updateUser}) => {
    
    //states to manage changes to user information
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    
    //takes movies and filters for favourites
    console.log(user);
    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

    // //this code was used in earlier attempts to fix issues and can likely be removed
    // const storedToken = localStorage.getItem("token");
    // let storedUsername = localStorage.getItem("username");
    // const [userData, setUserData] = useState();
    
    //code for the modals
    const [showModal1, setShowModal1] = useState(false);
    const handleCloseModal1 = () => setShowModal1(false);
    const handleShowModal1 = () => setShowModal1(true);

    const [showModal2, setShowModal2] = useState(false);
    const handleCloseModal2 = () => setShowModal2(false);
    const handleShowModal2 = () => setShowModal2(true);


        

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };

        fetch(`https://moviedb125.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${storedToken}`
            },

        }).then((response) => {
            if (response.ok) {
                alert("User information updated successfully");
                // updateUser(user);
                window.location.reload();
                // console.log(response.json());
                return response.json();

            } else {
                alert("Update failed");
            }
        });
    }

    const handleDelete = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };

        fetch(`https://moviedb125.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${storedToken}`
            },

        }).then((response) => {
            if (response.ok) {
                alert("Your account has been deleted, we're sorry to see you go!");
                onLoggedOut();
                // console.log(response.json());
                return response.json();

            } else {
                alert("Update failed");
            }
        });
    }
 
    
    const formatDateForFrontEnd = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd MMM yyyy");
    }

    const formatDateForBackEnd = (dateString) => {
        const date = new Date(dateString);
        return format(date, "yyyy mm dd");
    }

    return (
        <div>
            <div>
                <span>Username: </span>
                <span>{user.Username}</span>
            </div>
            <div>
                <span>Email: </span>
                <span>{user.Email}</span>
            </div>
            {user.Birthday && (
                <div>
                    <span>Birthday: </span>
                    <span>{formatDateForFrontEnd(user.Birthday)}</span>
                </div>
            )}
            <div>
                {!favoriteMovies ? (
                    <div>You have no favourite movies yet!</div>
                ) : ( 
                    <>   
                        <h3>Favourite Movies: </h3>
                        <span>
                        {favoriteMovies.map(movie => (
                            <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                            </span>
                    </>
                )}

                
                
            </div>


            <Link to={`/`}>
                <Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
            </Link>

            <Button onClick={handleShowModal1} className="primary-button" style={{ cursor: "pointer" }}>Update user information</Button>
            <Button onClick={handleShowModal2} variant="danger" className="warning-button" style={{ cursor: "pointer" }}>Delete Account</Button>

            
            <Modal show={showModal1} onHide={handleCloseModal1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add your updated information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.Username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type="email"
                            value={user.Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Birthday: </Form.Label>
                        <Form.Control
                            type="date"
                            // value={format(new Date(birthday), 'yyyy-MM-dd')}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    
                    
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal2} onHide={handleCloseModal2} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete your account? :(</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal2}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );

};

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         featured: PropTypes.bool.isRequired,
//         title: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         director: PropTypes.object
//     }).isRequired,
// };