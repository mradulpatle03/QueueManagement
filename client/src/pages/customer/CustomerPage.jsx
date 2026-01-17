import { useEffect, useState } from "react";
import api from "../../api/axios";
import { takeToken, getStatus } from "../../api/customer.api";

export default function CustomerPage() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api.get("/admin/services").then((res) => {
      setServices(res.data.data);
    });
  }, []);

  const create = async () => {
    const res = await takeToken({ serviceId });
    setToken(res.data.data);
  };

  const refresh = async () => {
    const res = await getStatus(token._id);
    setStatus(res.data.data);
  };

  return (
    <div className="p-6">
      <select
        onChange={(e) => setServiceId(e.target.value)}
        className="border p-2 mb-2"
      >
        <option>Select service</option>
        {services.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>
      <button
        onClick={create}
        disabled={!serviceId}
        className={`px-4 py-2 ${
          serviceId ? "bg-black" : "bg-gray-400"
        } text-white`}
      >
        Take Token
      </button>

      {token && (
        <div className="mt-4">
          <p>Token: {token.tokenNumber}</p>
          <p>Status: {token.status}</p>
          {token.status === "SERVING" && <p>Go to Counter {token.counterId}</p>}
          <button onClick={refresh} className="underline">
            Refresh Status
          </button>

          {status && (
            <div>
              <p>People ahead: {status.peopleAhead}</p>
              <p>Serving: {status.currentlyServing}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
