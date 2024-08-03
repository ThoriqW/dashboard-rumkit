import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = Cookies.get("auth");
    if (savedAuth) {
      const { data, expiresAt } = JSON.parse(savedAuth);
      if (Date.now() < expiresAt) {
        return data;
      } else {
        Cookies.remove("auth");
        window.location.reload();
        return null;
      }
    }
    return null;
  });


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
