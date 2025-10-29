import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, AlertTriangle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Wachtwoord moet minstens 6 tekens lang zijn.");
      setLoading(false);
      return;
    }

    try {
      await register(email, password, name);
      navigate("/profile");
    } catch (e) {
      setError(e.message || "Registratie mislukt. Probeer het opnieuw.");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Registreer voor <span className="text-red-600">F1 Tracker</span>
          </h1>
          <p className="text-gray-400">Word deel van de community</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-300
           bg-red-900 border border-red-700 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Naam (optioneel)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700
                 rounded-lg focus:ring-red-600 focus:border-red-600 outline-none transition-colors"
                placeholder="Uw Naam"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              E-mailadres
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700
                 rounded-lg focus:ring-red-600 focus:border-red-600 outline-none transition-colors"
                placeholder="uw.email@domein.be"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Wachtwoord
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700
                 rounded-lg focus:ring-red-600 focus:border-red-600 outline-none transition-colors"
                placeholder="Min. 6 tekens"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-red-600
             text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 mt-4"
          >
            <UserPlus className="w-5 h-5" />
            {loading ? "Registreren..." : "Account aanmaken"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Heeft u al een account?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:underline inline-flex items-center font-semibold"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
