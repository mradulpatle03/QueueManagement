import { useState } from "react";
import instance from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post(
        "/api/auth/login",
        form
      );
      
      dispatch(setCredentials({ user: data.user, token: data.token }));
      
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-xl">
        <h1 className="text-2xl mb-4 font-semibold">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="block mb-3 p-2 w-64 text-black"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="block mb-3 p-2 w-64 text-black"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
