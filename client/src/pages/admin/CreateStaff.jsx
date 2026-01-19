import { useState } from "react";
import { createStaff } from "../../api/admin.api";

const CreateStaff = ({ services }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    serviceId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStaff(form);
      alert("Staff created successfully");
      setForm({
        name: "",
        email: "",
        password: "",
        serviceId: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md">
      <h2 className="text-lg font-medium text-neutral-800 mb-4">
        Create Staff
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-neutral-300 p-6 space-y-4"
      >
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-neutral-400 px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-neutral-400 px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-neutral-400 px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Service Assignment
          </label>
          <select
            name="serviceId"
            value={form.serviceId}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2"
          >
            <option value="">Select service</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-sm uppercase tracking-wide
            ${
              loading
                ? "bg-neutral-400 cursor-not-allowed"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
        >
          {loading ? "Creating..." : "Create Staff"}
        </button>
      </form>
    </section>
  );
};

export default CreateStaff;
