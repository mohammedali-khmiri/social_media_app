import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducers";

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
