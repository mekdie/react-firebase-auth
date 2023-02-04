import React, { useState, useRef, useContext, useEffect } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Forgot = () => {
    const emailRef = useRef();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();

        //firebase password should be at least 6 characters
        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch (error) {
            console.log(error);
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    //check if the user has logged in then no need to go to login again, directly direct to dashboard
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, []);
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
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

                        <Button
                            disabled={loading}
                            className="w-100"
                            type="submit"
                        >
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/register">Register </Link>
            </div>
        </div>
    );
};

export default Forgot;
