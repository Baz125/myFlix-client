import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap"; 
import { Navigate } from "react-router-dom";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";

export const LoginView = ({ onLoggedIn }) => {
    //These states are created in order to "bind" the username and password to them
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

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
                console.log(response)
                if (response.status !== 200) {
                    alert ("Username or password is incorrect")
                    throw new Error(response.body.message)
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.user.Username);
                    onLoggedIn(data.token);
                    return <Navigate to="/" />;
                } else {
                    alert("No such user");
                }
                if (data.ok) {
                    dispatch(setUser(data.user));
                    // onLoggedIn(username);
                }

            })
            .catch((e) => {
                console.log("Something went wrong", e);
            });
    };

        return (
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
                        minLength="6"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        );
};
