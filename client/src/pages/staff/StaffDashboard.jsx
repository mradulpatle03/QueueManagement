import { useEffect, useState } from "react";
import { getQueue, callNext } from "../../api/staff.api";

export default function StaffDashboard() {
  const serviceId = "PUT_SERVICE_ID_HERE"; // temporary
  const counterId = "PUT_COUNTER_ID_HERE";

  const [queue, setQueue] = useState(null);

  const load = async () => {
    const res = await getQueue(serviceId);
    setQueue(res.data.data);
  };

  const next = async () => {
    await callNext({ serviceId, counterId });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Staff Queue</h2>

      <button onClick={next} className="bg-black text-white px-4 mb-4">
        Call Next
      </button>

      <div>
        <p>
          Serving: {queue?.serving?.tokenNumber || "None"}
        </p>

        <h4 className="mt-4">Waiting</h4>
        <ul>
          {queue?.waiting?.map((t) => (
            <li key={t._id}>Token {t.tokenNumber}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
