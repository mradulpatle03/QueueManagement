import { useEffect, useState } from "react";
import { getServices } from "../../api/admin.api";
import { useNavigate } from "react-router-dom";

const SelectService = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 p-16">
      <h1 className="text-2xl font-semibold text-neutral-900">
        Select Service
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        Choose the department you are assigned to
      </p>

      <div className="mt-10 max-w-xl border border-neutral-300 divide-y">
        {services.map((service) => (
          <button
            key={service._id}
            onClick={() => navigate(`/staff/counter/${service._id}`)}
            className="w-full text-left px-6 py-4 hover:bg-neutral-200 transition"
          >
            <span className="text-neutral-900 font-medium">
              {service.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectService;
