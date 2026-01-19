import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../../socket";
import { callNextToken, completeToken } from "../../api/token.api";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

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
    await completeToken(currentToken._id);
    setCurrentToken(null);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* LEFT INFO STRIP */}
      <div className="w-1/3 bg-neutral-900 text-white p-10 flex flex-col justify-between">
        <div>
          <h1 className="text-sm uppercase tracking-widest text-neutral-400">
            Counter Console
          </h1>
          <p className="text-3xl font-semibold mt-2">
            Counter {counterId.slice(-4)}
          </p>
        </div>

        <p className="text-xs text-neutral-500">Queue Management System</p>
      </div>

      {/* MAIN PANEL */}
      <div className="flex-1 p-14">
        <AnimatePresence mode="wait">
          {currentToken ? (
            <motion.div
              key="serving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl"
            >
              <p className="text-sm uppercase tracking-wide text-neutral-500">
                Now Serving
              </p>

              <div className="mt-4 text-[120px] font-bold text-neutral-900 leading-none">
                {currentToken.tokenNumber}
              </div>

              <div className="mt-10">
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white text-sm tracking-wide uppercase hover:bg-neutral-800 transition"
                >
                  <Check size={18} />
                  Mark Complete
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-xl"
            >
              <p className="text-sm uppercase tracking-wide text-neutral-500">
                Status
              </p>

              <p className="mt-4 text-2xl font-medium text-neutral-700">
                Waiting for next customer
              </p>

              <div className="mt-10">
                <button
                  disabled={!serviceId || !counterId}
                  onClick={handleCallNext}
                  className="flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white text-sm tracking-wide uppercase hover:bg-neutral-800 transition"
                >
                  Call Next
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StaffDashboard;
