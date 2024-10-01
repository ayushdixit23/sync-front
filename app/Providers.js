"use client";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
// import { Api } from "./slice/apiSlice";

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={makeStore}>{children}</Provider>
    </>
  );
};

export default Providers;
