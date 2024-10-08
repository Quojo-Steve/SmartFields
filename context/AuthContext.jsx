import axios from "axios";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // const Url = "http://10.100.48.119:8000/api";
  const Url = "https://smartfield-api.onrender.com/api";
  
  const categories = [
    { name: "All" },
    { name: "Sensors" },
    { name: "Ai Detection" },
    { name: "Diseases" },
    { name: "Solution" },
  ];

  const login = async (email, password) => {
    const response = await axios.post(`${Url}/auth/login`, { email, password });
    setCurrentUser(response.data.user);
    AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  };

  const register = async (email, password) => {
    const response = await axios.post(`${Url}/auth/register`, {
      email,
      password,
    });
    setCurrentUser(response.data.user);
    AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  };

  const getUser = async () => {
    const response = await axios.get(`${Url}/auth/getUser`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setCurrentUser(response.data.user);
    AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  };

  const logOut = async () => {
    setCurrentUser(null);
    AsyncStorage.setItem("user", JSON.stringify(null));
    return response.data;
  };

  useEffect(() => {
    const getUser = async () => {
      const storedData = await AsyncStorage.getItem("user");
      const user = storedData ? JSON.parse(storedData) : null;
      setCurrentUser(user);
    };
    if (!currentUser) {
      getUser();
    }
    // console.log(currentUser)
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, Url, categories, logOut, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
