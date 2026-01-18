import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../../socket";
import {
  callNextToken,
  completeToken,
} from "../../api/token.api";

const StaffDashboard = () => {
  const { serviceId, counterId } = useParams();
  const [currentToken, setCurrentToken] = useState(null);

  useEffect(() => {
    socket.emit("join:service", serviceId);

    socket.on("token:called", (data) => {
      if (data.counterId === counterId) {
        setCurrentToken(data);
      }
    });

    socket.on("token:completed", (data) => {
      if (data.counterId === counterId) {
        setCurrentToken(null);
      }
    });

    return () => {
      socket.off("token:called");
      socket.off("token:completed");
    };
  }, [serviceId, counterId]);

  const handleCallNext = async () => {
    const res = await callNextToken(counterId);
    setCurrentToken(res.data);
  };

  const handleComplete = async () => {
    completeToken(currentToken._id);
    setCurrentToken(null);
  };

  return (
    <div>
      <h2>Staff Dashboard</h2>

      {currentToken ? (
        <>
          <h3>Serving Token #{currentToken.tokenNumber}</h3>
          <button onClick={handleComplete}>Complete</button>
        </>
      ) : (
        <button onClick={handleCallNext}>Call Next</button>
      )}
    </div>
  );
};

export default StaffDashboard;
