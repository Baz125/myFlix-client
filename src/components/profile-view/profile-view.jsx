import moment from "moment/moment";
import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import accountIcon from "../../../assets/account-circle.svg";
import { setUser } from "../../redux/reducers/user";
import { MovieCard } from "../movie-card/movie-card";
import './profile-view.scss';

export const ProfileView = ({onLoggedOut}) => {

    const {user, token} = useSelector((state) => state.user);
    const {favoriteMovies} = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    //states to manage changes to user information
    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    
    //code for the modals
    const [showUpdateModal, setUpdateModal] = useState(false);
    const handleCloseUpdateModal = () => setUpdateModal(false);
    const handleShowUpdateModal = () => setUpdateModal(true);

    const [showDeleteModal, setDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setDeleteModal(false);
    const handleShowDeleteModal = () => setDeleteModal(true);
    

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://moviedb125.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        }).then((response) => {
            if (response.ok) {
                alert("User information updated successfully");
                return response.json();

            } else {
                alert("Update failed");
            }
        })
            .then((data) => { 
                console.log("resolved data", data);
                dispatch(setUser(data))
                handleCloseUpdateModal();
        });
    }

    const handleDelete = (event) => {
        event.preventDefault();

        fetch(`https://moviedb125.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${storedToken}`
            },

        }).then((response) => {
            if (response.ok) {
                alert("Your account has been deleted, we're sorry to see you go!");
                onLoggedOut();
                return response.json();

            } else {
                alert("Update failed");
            }
        });
    }

    return (
        <Container>
            <Row className="d-flex justify-content-center p-4 profile-view">
            <Card
                style={{ minWidth: "10rem", maxWidth: "20rem" }}
                className="shadow-lg p-3 rounded-4 text-center"
                text="light"
                bg="secondary"
                >
                    <div className="image-container">
                <Card.Img
                    variant="top"
                    src={accountIcon}
                    className="card-image"
                        /> 
                    </div>
                <Card.Body>
                    <Card.Title>Profile Information</Card.Title>   
                    <Card.Text>
                        <span>Username: </span>
                        <span>{user.Username}</span>
                        </Card.Text>

                        <Card.Text>
                        <span>Email: </span>
                        <span>{user.Email}</span>
                        </Card.Text>
                    
                    <Card.Text>
                    {user.Birthday && (
                        <>
                        <span>Birthday: </span>
                        <span>{moment(user.Birthday).format("Do MMM YYYY")}</span>
                        </>
                    )}
                    </Card.Text>

                    <Button onClick={handleShowUpdateModal} variant="info" style={{ cursor: "pointer" }} className="modalBtn">Update user information</Button>

                    <Button onClick={handleShowDeleteModal} variant="primary" className="warning-button modalBtn" style={{ cursor: "pointer" }}>Delete Account</Button>
                </Card.Body>    
            </Card>
            </Row>
            <Row className="favorite-movies">
                {!favoriteMovies?.length  ? (
                    <div>You have no favourite movies yet!</div>
                ) : ( 
                    <>   
                        <h3>Favourite Movies: </h3>
                {favoriteMovies?.map(movie => (
                            <Col className="mb-4" key={movie.id} md={4}>
                                <MovieCard
                            movie={movie}                                />
                            </Col>
                        ))}
                        </>
                )}
            </Row>


            <Link to={`/`}>
                <Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
            </Link>
            
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add your updated information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Birthday: </Form.Label>
                        <Form.Control
                            type="date"
                            value={moment(birthday).format("YYYY-MM-DD")}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete your account? :(</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );

};