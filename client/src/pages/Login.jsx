import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    const token = res.data.token;

    const payload = JSON.parse(atob(token.split(".")[1]));
    login(token, payload.role);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto">
      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-black text-white p-2 w-full">Login</button>
      <p className="text-center mt-2">
        New user?{" "}
        <a href="/register" className="underline">
          Register
        </a>
      </p>
    </form>
  );
}
