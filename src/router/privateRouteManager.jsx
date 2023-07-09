import React from "react";
import { Navigate } from "react-router-dom";
import FullMain from "../layouts/MainLayout/FullMain";
const PrivateRouteManager = () => {
    const manager = true
    return manager ? <FullMain /> : <Navigate to="admin/login" />;
};

export default PrivateRouteManager;