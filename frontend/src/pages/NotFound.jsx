import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleGoHome = () => {
    navigate("/", { navigate: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-full text-white flex items-start justify-center p-5 font-sans">
      <div className="text-center space-y-8 max-w-lg w-full">
        <h1
          className="
            text-9xl
            sm:text-[10rem]
            md:text-[14rem]
            font-extrabold
            tracking-tight
            text-red-600
            animate-pulse-slow
          "
        >
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 uppercase tracking-widest">
          Out of Track
        </h2>
        <p className="text-gray-300 text-lg sm:text-xl font-medium">
          De pagina die je zoekt met naam{" "}
          <span className="text-yellow-400 font-mono break-all">
            {pathname}
          </span>{" "}
          is de ideale racelijn kwijtgeraakt!
        </p>
        <div className="flex justify-center flex-wrap gap-4 pt-4">
          <button
            onClick={handleGoBack}
            className="
                          w-full sm:w-auto flex-grow sm:flex-grow-0  
                          inline-flex items-center justify-center 
                          px-8 py-3 
                          border-2 border-red-600 
                          text-lg font-bold uppercase 
                          rounded-full shadow-lg 
                          bg-red-600 text-white 
                          transition duration-300 ease-in-out 
                          transform hover:scale-105 hover:bg-red-700 
                          focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50
                      "
            aria-label="Ga terug naar de vorige pagina"
          >
            Return
          </button>
          
          <button
            onClick={handleGoHome}
            className="
                          w-full sm:w-auto flex-grow sm:flex-grow-0 
                          inline-flex items-center justify-center 
                          px-8 py-3 
                          border-2 border-yellow-400 
                          text-lg font-bold uppercase 
                          rounded-full shadow-lg 
                          bg-yellow-400 text-gray-900 
                          transition duration-300 ease-in-out 
                          transform hover:scale-105 hover:bg-yellow-500 
                          focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50
                      "
            aria-label="Ga terug naar de hoofdpagina"
          >
            Home
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default NotFoundPage;