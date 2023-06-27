import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap"; 

export const LoginView = ({ onLoggedIn }) => {
    //These states are created in order to "bind" the username and password to them
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // event.preventDefault();

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
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
                if (data.ok) {
                    onLoggedIn(username);
                }

            })
            .catch((e) => {
                console.log("Something went wrong", e);
            })
        

        
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
