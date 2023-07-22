import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [validated, setValidated] = useState(false);

    const handleValidation = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };

        fetch("https://moviedb125.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    }

    const handleSubmitAndValidate = () => {
        handleSubmit();
        handleValidation();
    } 

    return (
        <>
            <h1>Sign up for a free account</h1>
            <p>Give us some info about yourself below, and we'll create you a free account</p>
            <Form onSubmit={handleSubmitAndValidate} noValidate validated={validated} >
                <Form.Group controlId="validationCustom01">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                    />
                    <Form.Control.Feedback type="invalid">
                        Username must be at least 3 characters.
                    </Form.Control.Feedback>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>
                
                
                <Button variant="primary" type="submit">Submit</Button>
            </Form>

        </>
    )
};
