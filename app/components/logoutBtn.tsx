// components/LogoutButton.js
"use client";
import Cookies from "js-cookie";
const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.set("authToken", "", { expires: 0 });

    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
