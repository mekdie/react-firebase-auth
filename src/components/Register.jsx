import React, { useState, useRef, useContext } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Register = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            //return to stop the function immediately
            return setError("Passwords do not match");
        }

        //firebase password should be at least 6 characters
        try {
            setError("");
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value);
            //redirect to login
            navigate("/login", {
                state: {
                    message:
                        "You can now log in with your newly created account",
                },
            });
        } catch (error) {
            console.log(error);
            if (passwordRef.current.value.length < 6) {
                setError("Password needs to be at least 6 characters");
            } else {
                setError("Failed to register an account");
            }
        }

        setLoading(false);
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
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
                            <Form.Text className="text-muted">
                                The app will never share your email with anyone
                                else.
                            </Form.Text>
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
                        <Form.Group className="mb-3" id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                required
                                placeholder="Confirm password here"
                            />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            className="w-100"
                            type="submit"
                        >
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log in </Link>
            </div>
        </div>
    );
};

export default Register;
