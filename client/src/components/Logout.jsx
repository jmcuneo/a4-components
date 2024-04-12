import React from "react";
import { NavLink } from "react-router-dom";

export const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch(`${window.ENVIRONMENT.api}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.clear();

      // Clear sessionStorage
      sessionStorage.clear();

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return null;
};