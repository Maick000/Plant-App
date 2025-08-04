import { useState, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  getProfileRequest,
  logoutRequest,
  updateProfileRequest,
  getProfileByIdRequest,
} from "../api/Auth";
import { AuthContext } from "./useAuthContext";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
      console.log(res);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const getProfile = async () => {
    try {
      const res = await getProfileRequest();
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileById = async (id) => {
    try {
      const res = await getProfileByIdRequest(id);
      setUser(res.data);
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const updateProfile = async (id, profile) => {
    try {
      const res = await updateProfileRequest(id, profile);
      setUser(res.data);
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      return setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    logoutRequest();
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.accessToken) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.accessToken);
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
        } else{
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setErrors([error.response.data.message]);
      } finally {
        setLoading(false);
      }
      }
    checkLogin();
  }, [setIsAuthenticated, setUser, setLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      const cookies = Cookies.get();
      if (!cookies.accessToken) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        getProfile,
        getProfileById,
        updateProfile,
        isAuthenticated,
        error,
        setErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
