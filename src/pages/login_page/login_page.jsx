import React, { useState } from "react";
import axios from "axios";
import "./loginpage.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setpasswordError("");
  };

  const login = async () => {
    console.log(username, password);
    try {
      if (!username && !password) {
        setUsernameError("Please enter your username");
        setpasswordError("Please enter your password");
        return;
      }

      const res = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });

      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "http://localhost:5173/app/home";
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div id="container" className="flex justify-center items-center h-screen">
      <div className="w-[500px] h-[500px] backdrop-blur-md bg-[#111c39] bg-opacity-60 backdrop-saturate-150 backdrop-filter rounded-xl flex justify-center items-center">
        <form className="space-y-4">
          <div className="text-3xl text-white text-center">Logo</div>
          <div>
            <label className="block text-white">Username</label>
            <input
              type="text"
              className={`w-full h-10 px-3 rounded-md border ${
                usernameError ? "border-red-500" : "border-gray-600"
              }`}
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && (
              <p className="text-red-500 text-sm">{usernameError}</p>
            )}
          </div>
          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              className={`w-full h-10 px-3 rounded-md border ${
                usernameError ? "border-red-500" : "border-gray-600"
              }`}
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 mr-2 border-gray-600" />
              <label className="text-white">Remember me</label>
            </div>
            <a href="#" className="text-white text-sm underline">
              Forgot password?
            </a>
          </div>
          <button
            type="button"
            onClick={login}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
