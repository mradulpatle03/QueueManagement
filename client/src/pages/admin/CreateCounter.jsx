import { useEffect, useState } from "react";
import {getServices,createCounter } from "../../api/admin.api";

const CreateCounter = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
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
      await createCounter(form);
      alert("Counter created successfully");

      setForm({
        name: "",
        serviceId: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create counter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Create Counter</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Counter Name"
          value={form.name}
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
          {loading ? "Creating..." : "Create Counter"}
        </button>
      </form>
    </div>
  );
};

export default CreateCounter;
