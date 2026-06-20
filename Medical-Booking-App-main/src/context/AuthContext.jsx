import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, role) => {
    setUser({ email, role, name: email.split('@')[0] });
  };

const logout = () => {
  setUser(null);
  localStorage.removeItem("user"); 
  localStorage.clear(); 
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);