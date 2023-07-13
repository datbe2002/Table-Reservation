import React from "react";
import { Navigate } from "react-router-dom";
import FullMain from "../layouts/MainLayout/FullMain";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
    const { token } = useSelector(state => state.auth)
    return token ? <FullMain /> : <Navigate to="/login" />;
};

export default PrivateRoute;