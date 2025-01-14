import React from "react";
import { logOut } from "../../utils/authFunctions";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await logOut();
      alert("Logged out successfully");
    } catch (error: any) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};
