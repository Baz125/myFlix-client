import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../redux/reducers/user";
import "./login-view.scss";

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUpClick = (event) => {
        event.preventDefault();
        navigate('/signup');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const data = {
            username: username,
            password: password
        };
    
        fetch("https://moviedb125.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.status !== 200) {
                    alert("Username or password is incorrect")
                    throw new Error(response.body.message)
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.user.Username);
                    dispatch(setToken(data.token));
                    dispatch(setUser(data.user));
                    return <Navigate to="/" />;
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                console.log("Something went wrong", e);
            });
    };

    return (
        <>
            <h1>Sign in to access your account</h1>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="loginUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                    />
                </Form.Group>
        
                <Form.Group controlId="loginPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="3"
                    />
                </Form.Group>
                <Button className="submit-btn" variant="primary" type="submit">Submit</Button>
                <p>Don't have an account with us yet? <span><a href="#" onClick={handleSignUpClick}>Sign Up Now</a></span></p>
            </Form>
        </>
    );
};