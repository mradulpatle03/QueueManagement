import { useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await instance.post("/api/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-xl">
        <h1 className="text-2xl mb-4 font-semibold">Signup</h1>
        <input
          type="text"
          placeholder="Name"
          className="block mb-3 p-2 w-64 text-black"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <select
          className="block mb-3 p-2 w-64 text-black"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="business">Business</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
