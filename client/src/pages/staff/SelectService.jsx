import { useEffect, useState } from "react";
import { getServices } from "../../api/service.api";
import { useNavigate } from "react-router-dom";

const SelectService = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <div>
      <h2>Select Service</h2>
      {services.map((s) => (
        <button
          key={s._id}
          onClick={() => navigate(`/staff/counter/${s._id}`)}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
};

export default SelectService;
