import { useEffect, useState } from "react";
import api from "../../api/axios";
import socket from "../../socket";
import { takeToken } from "../../api/customer.api";

export default function CustomerPage() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [token, setToken] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);

  useEffect(() => {
    api.get("/admin/services").then((res) => {
      setServices(res.data.data);
    });
  }, []);

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

    const onQueueUpdated = (data) => {
      if (!token) return;
      if (data.serviceId === token.serviceId) {
        fetchQueueStatus(token);
      }
    };

    socket.on("token:called", onCalled);
    socket.on("token:completed", onCompleted);
    socket.on("queue:updated", onQueueUpdated);

    return () => {
      socket.off("token:called", onCalled);
      socket.off("token:completed", onCompleted);
      socket.off("queue:updated", onQueueUpdated);
    };
  }, []);

  const fetchQueueStatus = async (tkn) => {
    if (!tkn) return;

    const res = await api.get(
      `/redis-queue/status/${tkn.serviceId}/${tkn._id}`,
    );

    setQueueStatus(res.data.data);
  };

  const create = async () => {
    const res = await takeToken({ serviceId });
    setToken(res.data.data);
    fetchQueueStatus(res.data.data);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center px-6 py-14">
      <div className="w-full max-w-xl">
        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-neutral-900">
          Take a Token
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Please select a service and wait for your number to be called
        </p>

        {/* SERVICE SELECTION */}
        {!token && (
          <div className="mt-10 space-y-4">
            <label className="block text-sm font-medium text-neutral-700">
              Service
            </label>

            <select
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full border border-neutral-400 px-4 py-3 bg-white focus:outline-none"
            >
              <option value="">Select service</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <button
              onClick={create}
              disabled={!serviceId}
              className={`w-full mt-6 px-6 py-3 text-sm tracking-wide uppercase transition
                ${
                  serviceId
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                }`}
            >
              Issue Token
            </button>
          </div>
        )}

        {/* TOKEN SLIP */}
        {token && (
          <div className="mt-14 border border-neutral-400 bg-white">
            {/* TOP STRIP */}
            <div className="border-b border-neutral-300 px-6 py-4">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Your Token Number
              </p>
            </div>

            {/* TOKEN NUMBER */}
            <div className="px-6 py-10 text-center">
              <div className="text-[96px] font-bold text-neutral-900 leading-none">
                {token.tokenNumber}
              </div>

              <p className="mt-4 text-sm text-neutral-600 uppercase tracking-wide">
                Status: {token.status}
              </p>
            </div>

            {/* STATUS FOOTER */}
            <div className="border-t border-neutral-300 px-6 py-4">
              
              {queueStatus && token.status === "WAITING" && (
                <div className="mb-3 text-sm text-neutral-600">
                  <p>
                    People ahead:{" "}
                    <span className="font-medium">
                      {queueStatus.peopleAhead}
                    </span>
                  </p>
                  <p>
                    Currently serving:{" "}
                    <span className="font-medium">
                      {queueStatus.currentlyServing || "-"}
                    </span>
                  </p>
                </div>
              )}

              {token.status === "SERVING" ? (
                <p className="text-sm font-medium text-neutral-900">
                  Please proceed to counter{" "}
                  <span className="font-semibold">
                    {token.counterId?.slice(-3)}
                  </span>
                </p>
              ) : token.status === "COMPLETED" ? (
                <p className="text-sm text-neutral-500">
                  This token has been completed
                </p>
              ) : (
                <p className="text-sm text-neutral-500">
                  Please wait. Your number will be called shortly.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
