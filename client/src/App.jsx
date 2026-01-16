import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import CustomerPage from "./pages/customer/CustomerPage";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { useEffect } from "react";
import socket from "./socket";

function App() {
  
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={["STAFF"]}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CustomerPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
