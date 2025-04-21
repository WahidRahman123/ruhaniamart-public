import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-primaryColor text-white rounded-lg hover:bg-green-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
