import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../redux/reducers/user";

export const NavigationBar = ({ token, onLoggedOut }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onLogoutClick = () => {
        dispatch(setUser(null));
        onLoggedOut();
    }

    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="md" text="light" className="mb-4">
        <Container>
                <Navbar.Brand as={Link} to="/">
                    Movie App
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {!token && (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                Sign Up
                            </Nav.Link> 
                        </>
                    )}
                    {token && (
                        <>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/profile-view">My Profile</Nav.Link>
                            <Nav.Link onClick={() => onLogoutClick()}>Logout</Nav.Link>
                        </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        );
};