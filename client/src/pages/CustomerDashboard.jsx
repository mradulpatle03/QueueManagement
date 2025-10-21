import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function CustomerDashboard() {
    const dispatch = useDispatch();
    function handleLogout() {
        dispatch(logout());
    }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <button onClick={handleLogout}>Logout</button>
      <h1>Customer Dashboard</h1>
    </div>
  );
}
