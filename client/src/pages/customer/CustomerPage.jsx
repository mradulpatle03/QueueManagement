import { useEffect, useState } from "react";
import api from "../../api/axios";
import socket from "../../socket";
import { takeToken } from "../../api/customer.api";

export default function CustomerPage() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    api.get("/admin/services").then((res) => {
      setServices(res.data.data);
    });
  }, []);

  // 🔥 SOCKET LISTENERS
  useEffect(() => {
  const onCalled = (data) => {
    setToken((prev) => {
      if (!prev) return prev;
      if (data.tokenId !== prev._id) return prev;

      return {
        ...prev,
        status: data.status,
        counterId: data.counterId,
      };
    });
  };

  const onCompleted = (data) => {
    setToken((prev) => {
      if (!prev) return prev;
      if (data.tokenId !== prev._id) return prev;

      return {
        ...prev,
        status: data.status,
      };
    });
  };

  socket.on("token:called", onCalled);
  socket.on("token:completed", onCompleted);

  return () => {
    socket.off("token:called", onCalled);
    socket.off("token:completed", onCompleted);
  };
}, []);


  const create = async () => {
    const res = await takeToken({ serviceId });
    setToken(res.data.data);
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

          {token.status === "SERVING" && (
            <p>Go to Counter {token.counterId}</p>
          )}
        </div>
      )}
    </div>
  );
}
