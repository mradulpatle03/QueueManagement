import { useState } from "react";
import { registerUser } from "../api/auth.api";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await registerUser({
      ...form,
      role: "CUSTOMER",
    });

    const token = res.data.token;
    const payload = JSON.parse(atob(token.split(".")[1]));
    login(token, payload.role);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-sm mx-auto"
    >
      <h2 className="text-xl mb-4">Register</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="bg-black text-white p-2 w-full">
        Register
      </button>
    </form>
  );
}
