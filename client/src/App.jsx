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
import SelectService from "./pages/staff/SelectService";
import SelectCounter from "./pages/staff/SelectCounter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayScreen from "./pages/display/DisplayScreen";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("token:created", (data) => {
      console.log("TOKEN CREATED (LIVE):", data);
    });

    socket.on("token:called", (data) => {
      console.log("TOKEN CALLED (LIVE):", data);
    });

    socket.on("token:completed", (data) => {
      console.log("TOKEN COMPLETED (LIVE):", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("token:created");
      socket.off("token:called");
      socket.off("token:completed");
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
          <Route path="/staff" element={<SelectService />} />
          <Route path="/staff/counter/:serviceId" element={<SelectCounter />} />

          <Route
            path="/staff/dashboard/:serviceId/:counterId"
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
          <Route path="/display" element={<DisplayScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
