import { useEffect, useState } from "react";
import { getServices, createService } from "../../api/admin.api";
import CreateStaff from "./CreateStaff";
import CreateCounter from "./CreateCounter";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    refreshServices();
  }, []);

  const refreshServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  const addService = async () => {
    if (!name.trim()) return;
    await createService({ name });
    setName("");
    refreshServices(); // 🔥 SINGLE REFRESH POINT
  };

  return (
    <div className="min-h-screen bg-neutral-100 px-12 py-10">
      <h1 className="text-2xl font-semibold text-neutral-900">
        Administration Panel
      </h1>

      {/* SERVICES */}
      <section className="mt-10 max-w-2xl">
        <h2 className="text-lg font-medium mb-4">Services</h2>

        <div className="flex gap-3 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New service name"
            className="flex-1 border px-4 py-2"
          />
          <button
            onClick={addService}
            className="px-6 py-2 bg-neutral-900 text-white"
          >
            Add
          </button>
        </div>

        <div className="border bg-white">
          {services.map((s) => (
            <div
              key={s._id}
              className="px-4 py-3 border-b last:border-b-0"
            >
              {s.name}
            </div>
          ))}
        </div>
      </section>

      {/* PASS SERVICES DOWN */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <CreateStaff services={services} />
        <CreateCounter services={services} />
      </div>
    </div>
  );
}
