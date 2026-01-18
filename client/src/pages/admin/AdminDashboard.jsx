import { useEffect, useState } from "react";
import {
  getServices,
  createService,
} from "../../api/admin.api";
import CreateStaff from "./CreateStaff";
import CreateCounter from "./CreateCounter";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getServices();
    setServices(data);
  };

  const addService = async () => {
    await createService({ name });
    setName("");
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Services</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Service name"
          className="border p-2"
        />
        <button onClick={addService} className="bg-black text-white px-4">
          Add
        </button>
      </div>

      <ul>
        {services.map((s) => (
          <li key={s._id}>{s.name}</li>
        ))}
      </ul>

      <CreateStaff />
      <CreateCounter />
    </div>
  );
}
