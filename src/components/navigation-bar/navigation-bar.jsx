import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export const NavigationBar = ({token, onLoggedOut}) => {
  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
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
                        <Nav.Link as={Link} to="/myaccount">My Profile</Nav.Link>
                        <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                    </>
                      )}
                  </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
    );
};