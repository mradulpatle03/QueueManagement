import { SearchX, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-full bg-black/5 flex items-center justify-center">
            <SearchX className="h-7 w-7 text-black" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-900">404</h1>
        <p className="text-base text-gray-700 mt-1">
          Page not found
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-3">
          The page you’re looking for doesn’t exist or was moved.
        </p>

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

        {/* Footer hint */}
        <p className="mt-6 text-xs text-gray-400">
          Double-check the URL or return to a safe place.
        </p>
      </div>
    </div>
  );
}
