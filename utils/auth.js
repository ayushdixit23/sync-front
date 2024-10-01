"use client";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { checkToken } from "./usefull";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState("");

  const f = async (token) => {
    try {
      if (token) {
        const a = await checkToken(token);
        console.log(a, "sd")
        setData(a.payload);
        setAuth(true);
      } else {
        setAuth(false);
        setData("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("nexo-data-1") || null;
    f(token);
  }, [setAuth, auth]);
  return (
    <AuthContext.Provider value={{ data, auth, setAuth, setData, f }}>
      {children}
    </AuthContext.Provider>
  );
};
