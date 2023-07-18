import React from "react";
import { Navigate } from "react-router-dom";
import FullMain from "../layouts/MainLayout/FullMain";
import { useSelector } from "react-redux";
const PrivateRouteManager = () => {
    const { manager } = useSelector(state => state.auth)

    return manager ? <FullMain /> : <Navigate to="admin/login" />;
};

export default PrivateRouteManager;