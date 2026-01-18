import { useEffect, useState } from "react";
import { getServices,createStaff } from "../../api/admin.api";

const CreateStaff = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    serviceId: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
    <div style={{ maxWidth: 400 }}>
      <h2>Create Staff</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="serviceId"
          value={form.serviceId}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Staff"}
        </button>
      </form>
    </div>
  );
};

export default CreateStaff;
