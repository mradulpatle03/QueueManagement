import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BusinessDashboard from "./pages/BusinessDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);


  const Root = () => (user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Navigate to="/login" replace />);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected dashboards */}
        <Route
          path="/business/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="business">
                <BusinessDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="customer">
                <CustomerDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
