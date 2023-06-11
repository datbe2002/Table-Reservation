import React from "react";
import { Navigate } from "react-router-dom";
import FullMain from "../layouts/MainLayout/FullMain";
const PrivateRoute = () => {
    const user = true
    return user ? <FullMain /> : <Navigate to="/login" />;
};

export default PrivateRoute;