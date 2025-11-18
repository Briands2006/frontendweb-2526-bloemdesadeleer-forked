import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { Loader2 } from "lucide-react";

export const AdminRoute = ({ children }) => {
  const { isAuthed, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-600">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (isAuthed && isAdmin) ? children : <Navigate to="/" replace />;
};
