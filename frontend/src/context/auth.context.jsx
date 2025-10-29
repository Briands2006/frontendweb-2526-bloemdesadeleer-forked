import React, { createContext, useEffect, useState } from "react";
import { findUserByEmail, addUser } from "../api/mock-users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("f1_auth_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      delete user.password;
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const register = async (email, password, name) => {
    const newUser = addUser(email, password, name);
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;

    setCurrentUser(userWithoutPassword);
    localStorage.setItem("f1_auth_user", JSON.stringify(newUser));
    return newUser;
  };

  const login = async (email, password) => {
    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      throw new Error("Ongeldige inloggegevens.");
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    setCurrentUser(userWithoutPassword);
    localStorage.setItem("f1_auth_user", JSON.stringify(user));
    return userWithoutPassword;
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem("f1_auth_user");
  };

  const loginWithGoogle = () => {
    throw new Error("Google Login is momenteel gedeactiveerd.");
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    loginWithGoogle,
    loading,
    isAdmin: currentUser ? currentUser.isAdmin : false,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;