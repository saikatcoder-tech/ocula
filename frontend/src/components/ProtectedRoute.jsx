import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../utils/api.js";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        toast.error("Login First");
        return;
      }

      try {
        await api.get("api/auth/me");

        setIsValid(true);
      } catch (error) {
        localStorage.removeItem("token");
        setIsValid(false);
        toast.error("Not Authorized");
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
