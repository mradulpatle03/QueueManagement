import { useEffect, useState } from "react";
import socket from "../../socket";

export default function DisplayScreen() {
  const [current, setCurrent] = useState([]);
  useEffect(() => {
    socket.on("token:called", (token) => {
      setCurrent((prev) => {
        const filtered = prev.filter((t) => t.counterId !== token.counterId);
        return [...filtered, token];
      });
    });

    socket.on("token:completed", (token) => {
      setCurrent((prev) => prev.filter((t) => t._id !== token._id));
    });

    return () => {
      socket.off("token:called");
      socket.off("token:completed");
    };
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Now Serving</h1>

      {current.length === 0 && (
        <p className="text-xl text-gray-400">Waiting for next token...</p>
      )}

      {current.map((t) => (
        <div
          key={t._id}
          className="border border-white p-6 mb-4 text-center w-96"
        >
          <p className="text-3xl font-bold">Token {t.tokenNumber}</p>
          <p className="text-xl">Counter {t.counterId}</p>
        </div>
      ))}
    </div>
  );
}
