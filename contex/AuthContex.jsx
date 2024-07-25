import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

//   const Url = "http://172.20.10.3:8000/api";
  const Url = "https://smartfield-api.onrender.com/api";

  const login = async (email, password) => {
    const response = await axios.post(`${Url}/auth/login`, { email, password });
    setCurrentUser(response.data.user);
    return response.data;
  };

  const register = async (email, password) => {
    const response = await axios.post(`${Url}/auth/register`, { email, password });
    setCurrentUser(response.data.user);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, Url }}>
      {children}
    </AuthContext.Provider>
  );
};
