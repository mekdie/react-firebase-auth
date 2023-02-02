import Register from "./components/Register";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}

export default App;
