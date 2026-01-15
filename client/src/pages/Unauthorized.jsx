import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Unauthorized() {
  const { role } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-full bg-black/5 flex items-center justify-center">
            <ShieldAlert className="h-7 w-7 text-black" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Access denied
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          You don’t have permission to view this page.
        </p>

        {/* Optional role info */}
        {role && (
          <p className="mt-3 text-xs text-gray-400">
            Logged in as <span className="font-medium">{role}</span>
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full rounded-lg
                       bg-black text-white py-2.5 text-sm font-medium
                       hover:bg-gray-900 transition"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full rounded-lg
                       border border-gray-300 py-2.5 text-sm font-medium
                       text-gray-700 hover:bg-gray-50 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>

        {/* Soft hint */}
        <p className="mt-6 text-xs text-gray-400">
          If you believe this is a mistake, please contact an administrator.
        </p>
      </div>
    </div>
  );
}
