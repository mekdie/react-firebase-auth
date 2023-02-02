import Register from "./components/Register";
import { Container } from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Container
                style={{ minHeight: "100vh" }}
                className="d-flex align-items-center justify-content-center"
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Register />
                </div>
            </Container>
        </div>
    );
}

export default App;
