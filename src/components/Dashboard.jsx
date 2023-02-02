import React, { useContext, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { currentUser, logout } = useContext(AuthContext);

    async function handleLogout() {
        setError("");

        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.log(err);
            setError("Failed to log out");
        }
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger"> {error}</Alert>}
                    <strong>Email: {currentUser.email}</strong>
                    <Link
                        to="/update-profile"
                        className="btn btn-primary w-100 mt-3"
                    >
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </div>
    );
}
