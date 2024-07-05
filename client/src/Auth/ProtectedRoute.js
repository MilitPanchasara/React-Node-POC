import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        alert("please login in your account")
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;