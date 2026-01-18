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
    <div>
      <h2>Select Counter</h2>
      {counters.map((c) => (
        <button
          key={c._id}
          disabled={c.status === "PAUSED"}
          onClick={() =>
            navigate(`/staff/dashboard/${serviceId}/${c._id}`)
          }
        >
          {c.name} ({c.status})
        </button>
      ))}
    </div>
  );
};

export default SelectCounter;
