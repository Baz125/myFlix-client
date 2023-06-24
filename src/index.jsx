import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

// Iport statement to indicate that you need to bundle `./index.scss`
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

// Main componend (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <Container style={{border: "1px solid red"}}>
            <MainView />
        </Container>
    ); 
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
