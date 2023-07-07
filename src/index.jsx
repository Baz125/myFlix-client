import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import { store } from "./redux/store";
import { Provider } from "react-redux";


// Import statement to indicate that you need to bundle `./index.scss`
import "./custom.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <Provider store={store}>
            <Container fluid className="p-0">
                <MainView text="light" />
            </Container>
        </Provider>
    ); 
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
