import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function PrivateRoute() {
    const { currentUser } = useContext(AuthContext);

    //if logged in the go to the children outlet otherwise go to login
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
