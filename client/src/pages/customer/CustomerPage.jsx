import { useState } from "react";
import { takeToken, getStatus } from "../../api/customer.api";

export default function CustomerPage() {
  const serviceId = "PUT_SERVICE_ID_HERE";
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(null);

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
      <button onClick={create} className="bg-black text-white px-4">
        Take Token
      </button>

      {token && (
        <div className="mt-4">
          <p>Token: {token.tokenNumber}</p>
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
