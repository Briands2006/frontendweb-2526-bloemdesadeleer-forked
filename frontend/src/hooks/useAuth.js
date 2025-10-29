import { useContext } from "react";
import AuthContext from "../context/auth.context.jsx";

export const useAuth = () => {
  return useContext(AuthContext);
};
