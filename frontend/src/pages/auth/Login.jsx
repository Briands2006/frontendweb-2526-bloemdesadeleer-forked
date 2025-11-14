import React, { useCallback, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, UserPlus, Mail, Lock, AlertTriangle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { FormProvider, useForm } from "react-hook-form";

const validationRules = {
  email: {
    required: "E-mailadres is vereist",
  },
  password: {
    required: "Wachtwoord is vereist",
  },
};

export const Login = () => {
  const [authError, setAuthError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();

  const { login, loginWithGoogle } = useAuth();

  const methods = useForm({
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  const handleLogin = useCallback(
    async ({ email, password }) => {
      setAuthError("");

      try {
        const loggedIn = await login(email, password);

        if (loggedIn) {
          const params = new URLSearchParams(search);
          navigate({
            pathname: params.get("redirect") || "/",
            replace: true,
          });
        } else {
          setAuthError("Inloggen mislukt. Onbekende fout.");
        }
      } catch (e) {
        const errorMessage =
          e.message || "Login mislukt. Controleer uw gegevens.";
        setAuthError(errorMessage);
        console.error("Login Error:", e);
      }
    },
    [login, navigate, search],
  );

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setGoogleLoading(true);

    try {
      await loginWithGoogle();
      navigate("/");
    } catch (e) {
      setAuthError(
        e.message || "Login met Google mislukt. Probeer het opnieuw.",
      );
      console.error("Google Login Error:", e);
    }
    setGoogleLoading(false);
  };

  const loading = isSubmitting || googleLoading;

  const displayError =
    authError || errors.email?.message || errors.password?.message;

  return (
    <FormProvider {...methods}>
      <div className="h-full bg-transparent flex flex-col items-center justify-center text-white p-4">
        <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Inloggen bij <span className="text-red-600">F1 Tracker</span>
            </h1>
            <p className="text-gray-400">Gebruik uw e-mail en wachtwoord</p>
          </div>

          {displayError && (
            <div
              className="flex items-center gap-2 p-3 mb-4 text-sm text-red-300
                            bg-red-900 border border-red-700 rounded-lg"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{displayError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                E-mailadres
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  {...register("email", validationRules.email)}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-800 border 
                                        ${errors.email ? "border-red-600" : "border-gray-700"}
                                        rounded-lg focus:ring-red-600 focus:border-red-600
                                         outline-none transition-colors`}
                  placeholder="uw.email@domein.be"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                Wachtwoord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  {...register("password", validationRules.password)}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-800 border 
                                        ${errors.password ? "border-red-600" : "border-gray-700"}
                                         rounded-lg focus:ring-red-600 focus:border-red-600 
                                         outline-none transition-colors`}
                  placeholder="Wachtwoord"
                  disabled={loading}
                />
              </div>
            </div>

            <br />

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex cursor-pointer items-center justify-center gap-2 bg-red-600
                                text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700
                                 transition-colors disabled:opacity-50"
              data-cy="submit_btn"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Laden..." : "Inloggen"}
            </button>

            <br />
            <Divider
              className="text-white"
              sx={{
                "&::before, &::after": {
                  borderColor: "white",
                  opacity: 0.2,
                },
                "& .MuiDivider-wrapper": {
                  backgroundColor: "rgb(17 24 39)",
                },
              }}
            >
              of
            </Divider>
            <br />

            <button
              type="button"
              onClick={handleGoogleSubmit}
              disabled={loading}
              className="w-full inline-flex cursor-pointer items-center justify-center gap-2 bg-white
                                text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-300
                                 transition-colors disabled:opacity-50"
            >
              <GoogleIcon className="w-5 h-5" />
              {loading ? "Laden..." : "Inloggen met Google"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Nog geen account?{" "}
            <Link
              to="/register"
              className="text-red-500 hover:underline inline-flex items-center font-semibold"
            >
              Registreer nu
              <UserPlus className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
