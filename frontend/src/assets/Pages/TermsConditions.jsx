import { Link } from "react-router-dom";

export default function TermsConditions() {
  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">Terms & Conditions</h1>
      <p className="text-gray-600 mt-2">
        Welcome to our website. By accessing or using our service, you agree to be bound by these Terms and Conditions. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Acceptance of Terms</h2>
      <p className="text-gray-600">
        By using our website, you accept and agree to these terms in full. If you do not agree, please do not use our services.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. User Responsibilities</h2>
      <p className="text-gray-600">
        You must use our website in compliance with all applicable laws and regulations and must not engage in prohibited activities.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Modifications</h2>
      <p className="text-gray-600">
        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Contact Us</h2>
      <p className="text-gray-600">
        If you have any questions about these Terms & Conditions, please contact us.
      </p>

      <Link to="/" className="block mt-6 text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
