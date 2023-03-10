import React, { useState, useRef, useContext, useEffect } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const location = useLocation();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { currentUser, login } = useContext(AuthContext);

    //message state
    const [postRegMsg, setPostRegMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        //firebase password should be at least 6 characters
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            // console.log(error.code);
            if (error.code === "auth/wrong-password") {
                setError(
                    "Wrong password. Please try again or reset your password"
                );
            } else {
                setError("Failed to sign in");
            }
        }

        setLoading(false);
    }

    //check if the user has logged in then no need to go to login again, directly direct to dashboard

    //BUG: this useEffect is causing unnecessary re-renders causing the second render doesn't have the desired values (e.g. state from locations after registering to show message)

    //BUG 2: removing this solves an issue, but if we refresh the current page, the message will not disappear

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }

        //set the post registMsg if only it's empty (for now)
        const storedMsg = localStorage.getItem("postRegMsg");

        if (storedMsg) {
            setPostRegMsg(storedMsg);

            //set timeout to delay the removing message after registration
            setTimeout(() => {
                localStorage.removeItem("postRegMsg");
            }, 1000);
        } else {
            if (location.state) {
                localStorage.setItem("postRegMsg", location.state.message);
            }
        }
    }, []);

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    {postRegMsg && (
                        <Alert variant="success">{postRegMsg}</Alert>
                    )}
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
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/register">Register </Link>
            </div>
        </div>
    );
};

export default Login;
