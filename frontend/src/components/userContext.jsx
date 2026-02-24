import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [])

  const fetchUser = async () => {
    try {
        const response = await api.get("/api/auth/me");
        setUser(response.data);
    } catch (error) {
        console.log("failed to fetch user");
        return null;
    }
  };

  return (
    <UserContext.Provider value = {{ user, setUser, fetchUser }}>
        {children}
    </UserContext.Provider>
  );
}

export default UserProvider