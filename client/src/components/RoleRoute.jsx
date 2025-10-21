import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function RoleRoute({ role, children }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  return children;
}
