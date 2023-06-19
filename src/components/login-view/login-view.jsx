import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    //These states are created in order to "bind" the username and password to them
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token, data.token");
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
                if (response.ok) {
                    onLoggedIn(username);
                } else {
                    alert("Login failed");
                }

            })
            .catch((e) => {
                alert("Something went wrong");
            })
        

        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="6"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
            </label>
            <button type="submit">"Submit"</button>
        </form>
    );
};
