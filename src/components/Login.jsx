import React, { useState, useRef, useContext, useEffect } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const trigger = useRef();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { state } = useLocation();

    const { currentUser, login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        //firebase password should be at least 6 characters
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            console.log(error);
            setError("Failed to sign in");
        }

        setLoading(false);
    }

    //check if the user has logged in then no need to go to login again, directly direct to dashboard
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
        if (state) {
            console.log(state.message);
            trigger.current.click();
            setMessage(state.message);
        }
    }, []);
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    {console.log(message)}
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                placeholder="Enter email here"
                            />
                            {/* <Form.Text className="text-muted">
                                The app will never share your email with anyone
                                else.
                            </Form.Text> */}
                        </Form.Group>
                        <Form.Group className="mb-3" id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                required
                                placeholder="Enter password here"
                            />
                        </Form.Group>

                        <Button
                            disabled={loading}
                            className="w-100"
                            type="submit"
                        >
                            Log in
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <button
                hidden
                ref={trigger}
                onClick={() => setMessage(state.message)}
            >
                click
            </button>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/register">Register </Link>
            </div>
        </div>
    );
};

export default Login;
