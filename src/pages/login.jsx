import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      const accessToken = response.access_token;
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", {
          accessToken: accessToken,
        })
        .then((response) => {
          toast.success("Login successful!");
          const token = response.data.token;
          localStorage.setItem("token", token);
          if (response.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        });
    },
  });

  async function handleLogin() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/login.jpg')] bg-center bg-cover flex flex-col md:flex-row items-center justify-center md:justify-evenly px-4 py-8">
      {/* Left Section */}
      <div className="w-full md:w-[50%] h-[200px] md:h-full"></div>

      {/* Right Section */}
      <div className="w-full md:w-[50%] h-full flex items-center justify-center">
        <div className="w-full max-w-[90%] sm:max-w-[400px] md:w-[500px] h-auto md:h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col items-center justify-center gap-6 p-6">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Username"
            value={email}
            className="w-full h-[50px] rounded-[10px] border-2 border-[#77dec7] px-4"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
            className="w-full h-[50px] rounded-[10px] border-2 border-[#77dec7] px-4"
          />
          <button
            onClick={handleLogin}
            className="w-full max-w-[200px] h-[50px] rounded-[10px] bg-[#77dec7] text-white font-bold text-[20px] cursor-pointer transform hover:scale-102 transition"
          >
            Login
          </button>
          <button
            onClick={googleLogin}
            className="w-full max-w-[240px] h-[50px] rounded-[10px] bg-[#77dec7] text-white font-bold text-[20px] cursor-pointer flex items-center justify-center gap-2 transform hover:scale-102 transition"
          >
            <GrGoogle className="text-xl text-[#048065] cursor-pointer" />
            <span className="text-[#000b08] font-bold text-[15px]">
              Login with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
  
