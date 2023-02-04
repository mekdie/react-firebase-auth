import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [user, loading, error] = useAuthState(auth);

    function register(email, password) {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                //signOut immediately after registering user to prevent auto log in
                auth.signOut();
            });
    }

    //login function
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    //logout function
    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    // useEffect(() => {
    //     setLoading(false);
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         setCurrentUser(user);
    //     });
    //     if (!currentUser) {
    //         setCurrentUser(auth);
    //     }
    //     return unsubscribe;
    // }, []);

    const value = {
        currentUser: user,
        login,
        register,
        logout,
        resetPassword,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
