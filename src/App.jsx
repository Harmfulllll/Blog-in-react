import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import authService, { auth } from "./Appwrite/auth.js";
import { login, logout } from "./Features/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getUser()
      .then((data) => {
        if (data) dispatch(login({ data }));
        else dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div
          className="w-full block
           "
        ></div>
      </div>
    </>
  ) : null;
}

export default App;
