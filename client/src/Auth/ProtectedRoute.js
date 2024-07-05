import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = ({ element,allowedRoles  }) => {
    const { isAuthenticated } = useAuth();
    const { authState } = useAuth();

    if (!isAuthenticated) {
        alert("please login in your account")
        return <Navigate to="/" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(parseInt(authState.role,10))) {
        alert("You do not have permission to access this page");
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;