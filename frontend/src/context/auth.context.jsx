import { useState, useCallback, useMemo } from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api";
import useSWR from "swr";
import { JWT_TOKEN_KEY, AuthContext } from "./auth";
import { mutate } from "swr";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSWR(token ? "users/me" : null, api.getById);

  // Debugging for token [AuthProvider]

  // console.log("[AuthProvider] token:", token);
  // console.log(
  //   "[AuthProvider] swr user:",
  //   user,
  //   "userLoading:",
  //   userLoading,
  //   "userError:",
  //   userError,
  // );

  const {
    trigger: doLogin,
    isMutating: loginLoading,
    error: loginError,
  } = useSWRMutation("session", api.post);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation("users", api.post);

  const setSession = useCallback((token) => {
    setToken(token);
    localStorage.setItem(JWT_TOKEN_KEY, token);
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        const { token } = await doLogin({
          email,
          password,
        });

        setSession(token);
        mutate("users/me");

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin, setSession],
  );

  const register = useCallback(
    async (data) => {
      try {
        const { token } = await doRegister(data);
        setSession(token);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession],
  );

  const logout = useCallback(() => {
    setToken(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      error: loginError || userError || registerError,
      loading: loginLoading || userLoading || registerLoading,
      isAuthed: Boolean(token),
      isAdmin: user?.isAdmin === true,
      ready: !userLoading,
      login,
      logout,
      register,
    }),
    [
      token,
      user,
      loginError,
      loginLoading,
      userError,
      userLoading,
      registerError,
      registerLoading,
      login,
      logout,
      register,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
