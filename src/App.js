import Register from "./components/Register";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Container
                    style={{ minHeight: "100vh" }}
                    className="d-flex align-items-center justify-content-center"
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Router>
                            <Routes>
                                <Route element={<PrivateRoute />}>
                                    {/* All the routes that want to be protected  */}
                                    {/* this is the child / outlet  */}
                                    <Route
                                        path="/"
                                        exact
                                        element={<Dashboard />}
                                    />
                                </Route>
                                <Route
                                    path="/register"
                                    element={<Register />}
                                ></Route>
                                <Route
                                    path="/login"
                                    element={<Login />}
                                ></Route>
                            </Routes>
                        </Router>
                    </div>
                </Container>
            </div>
        </AuthProvider>
    );
}

export default App;
