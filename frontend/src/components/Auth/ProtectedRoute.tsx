import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";


function ProtectedRoute() {
    const { isAuthenticated } = useGlobalContext();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}


export default ProtectedRoute;
