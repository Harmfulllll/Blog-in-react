import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth.js";
import { logout } from "../../Features/authSlice.js";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div>
      <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
