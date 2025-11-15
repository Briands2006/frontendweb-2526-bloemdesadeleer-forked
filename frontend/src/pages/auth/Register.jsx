import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  AlertTriangle,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

const calculatePassStrength = (pass) => {
  const checks = [
    { regex: /.{6,}/, message: "Minimaal 6 tekens" },
    { regex: /[A-Z]/, message: "Minimaal 1 hoofdletter" },
    { regex: /[a-z]/, message: "Minimaal 1 kleine letter" },
    { regex: /[0-9]/, message: "Minimaal 1 cijfer" },
    { regex: /[^A-Za-z0-9]/, message: "Minimaal 1 speciaal teken" },
  ];

  let passScore = 0;
  const failedChecks = [];
  let checksPassed = 0;

  checks.forEach((check) => {
    if (check.regex.test(pass)) {
      passScore += 20; // want hij bestaat uit 5 checks
      checksPassed++; // deze omhoog als een check is gepasseerd, zodat de button enabled als alle checks zijn voldaan
    } else {
      failedChecks.push(check.message);
    }
  });

  return { passScore, failedChecks, isStrong: checksPassed === checks.length };
};

const isNotFutureDate = (dateString) => {
  if (!dateString) return false;
  const selectDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectDate <= today;
};

export const Register = () => {
  const MIN_LENGTH = 6;
  const NAME_MAX_LENGTH = 20;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const strength = useMemo(() => calculatePassStrength(password), [password]); // 2e is om bij elke wijziging te checken

  const handleStrengthColor = (score) => {
    if (score < 40) return "bg-red-500";
    if (score < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!strength.isStrong) {
      setError("Wachtwoord voldoet niet aan alle vereisten.");
      setLoading(false);
      return;
    }

    if (password.length < MIN_LENGTH) {
      setError("Wachtwoord moet minstens 6 tekens lang zijn.");
      setLoading(false);
      return;
    }

    if (name.length > NAME_MAX_LENGTH) {
      setError(
        `Gebruikersnaam mag niet langer zijn dan ${NAME_MAX_LENGTH} tekens.`,
      );
      setLoading(false);
      return;
    }

    if (!date) {
      setError("Geboortedatum is verplicht");
      setLoading(false);
      return;
    }

    if(!isNotFutureDate(date)) {
      setError("Geboortedatum kan niet in de toekomst liggen");
      setLoading(false);
      return;
    }

    try {
      await register(email, password, name, date);
      navigate("/profile");
    } catch (e) {
      setError(e.message || "Registratie mislukt. Probeer het opnieuw.");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="h-full bg-transparent flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Registreer voor <span className="text-red-600">F1 Tracker</span>
          </h1>
          <p className="text-gray-400">Word deel van de community</p>
        </div>

        {error && (
          <div
            className="flex items-center gap-2 p-3 mb-4 text-sm text-red-300
           bg-red-900 border border-red-700 rounded-lg"
          >
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
            <label className='block text-sm font-medium mb-1 text-gray-300'>Geboortedatum</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder='dd/mm/jjjj'
              className="w-full pl-3 pr-4 py-2 bg-gray-800 border border-gray-700
              rounded-lg focus:ring-red-600 focus:border-red-600 outline-none transition-colors"
            />
            {date && !isNotFutureDate(date) && (<p className='text-xs text-red-400 mt-1'>
              Geboortedatum kan niet in de toekomst liggen.</p>)}
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
                placeholder="Min. 6 tekens, hoofdletter, cijfer, speciaal teken"
              />
            </div>
          </div>

          {password.length > 0 && (
            <div className="w-full mt-1">
              <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ease-in-out ${handleStrengthColor(
                    strength.passScore,
                  )}`}
                  style={{ width: `${strength.passScore}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 text-gray-400">
                Sterkte: {strength.passScore}%
              </p>
            </div>
          )}

          {password.length > 0 && (
            <div className="text-sm space-y-1 mt-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
              {calculatePassStrength(password).failedChecks.length > 0 ? (
                <p className="font-semibold text-red-400">Nog vereist:</p>
              ) : (
                <p className="font-semibold text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Voldoet aan alle
                  vereisten!
                </p>
              )}

              {calculatePassStrength(password).failedChecks.map((message) => (
                <p
                  key={message}
                  className="flex items-center gap-2 text-red-300"
                >
                  <XCircle className="w-3 h-3" />
                  {message}
                </p>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !strength.isStrong || !email || !password}
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
