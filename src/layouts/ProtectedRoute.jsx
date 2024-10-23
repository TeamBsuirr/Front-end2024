// ProtectedRoute.js
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Spinner from "../components/other/Spinner";
import { checkAdminStatus } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const currentLNG = localStorage.getItem("language") || "ru";
    const linkToPass = "/" + currentLNG + "/login";

    useEffect(() => {
        const verifyAdmin = async () => {
            const result = checkAdminStatus();
            setIsAdmin(result);
            setIsLoading(false);
        };

        verifyAdmin();
    }, []);

    if (isLoading) {
        return <Spinner size="large" />; // Or a loading screen
    }

    return isAdmin ? children : <Navigate to={linkToPass} replace />;
};

export default ProtectedRoute;
