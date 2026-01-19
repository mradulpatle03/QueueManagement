import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountersByService } from "../../api/counter.api";

const SelectCounter = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    getCountersByService(serviceId).then(setCounters);
  }, [serviceId]);

  return (
    <div className="min-h-screen bg-neutral-100 p-16">
      <h1 className="text-2xl font-semibold text-neutral-900">
        Select Counter
      </h1>

      <div className="mt-10 max-w-xl space-y-2">
        {counters.map((counter) => {
          const isPaused = counter.status === "PAUSED";

          return (
            <button
              key={counter._id}
              disabled={isPaused}
              onClick={() =>
                navigate(`/staff/dashboard/${serviceId}/${counter._id}`)
              }
              className={`w-full flex justify-between items-center px-6 py-4 border 
                ${
                  isPaused
                    ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                    : "bg-white hover:bg-neutral-100"
                }`}
            >
              <span className="font-medium">
                {counter.name}
              </span>

              <span
                className={`text-xs uppercase tracking-wide px-3 py-1 border
                  ${
                    isPaused
                      ? "border-neutral-400"
                      : "border-neutral-900 text-neutral-900"
                  }`}
              >
                {counter.status}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectCounter;
