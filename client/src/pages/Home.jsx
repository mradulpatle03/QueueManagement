import { Link } from "react-router-dom";
import { Users, ClipboardList, Shield } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { token, role } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-900">
          Queue Management System
        </h1>
        <p className="text-gray-600 mt-1">
          Simple. Fair. Real-time queue handling.
        </p>

        {/* Auth CTA */}
        {!token && (
          <div className="mt-6 flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Register
            </Link>
          </div>
        )}

        {/* Role based sections */}
        {token && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* Customer */}
            {role === "CUSTOMER" && (
              <Link
                to="/customer"
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <ClipboardList className="h-6 w-6 mb-2 text-black" />
                <h3 className="font-medium text-gray-900">
                  Take a Token
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Join a queue and track your position in real time.
                </p>
              </Link>
            )}

            {/* Staff */}
            {role === "STAFF" && (
              <Link
                to="/staff"
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <Users className="h-6 w-6 mb-2 text-black" />
                <h3 className="font-medium text-gray-900">
                  Manage Queue
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Call, serve, and complete tokens efficiently.
                </p>
              </Link>
            )}

            {/* Admin */}
            {role === "ADMIN" && (
              <Link
                to="/admin"
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <Shield className="h-6 w-6 mb-2 text-black" />
                <h3 className="font-medium text-gray-900">
                  Admin Dashboard
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Manage services, counters, and staff.
                </p>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
