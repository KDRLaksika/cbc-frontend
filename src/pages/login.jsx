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
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google",{
        accessToken: accessToken
      }).then((response) => {
        toast.success("Login successful!");
        const token = response.data.token;
        localStorage.setItem("token", token);
        if(response.data.role === "admin"){
          navigate("/admin");
        }else{
          navigate("/");
        }
      })
    }
  })

  async function handleLogin() {
    
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password
      })
      toast.success("Login successful!");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      if(response.data.role === "admin"){
        navigate("/admin");
      }else{
        navigate("/");
      }

      
    }
    catch (error) {
      //console.error("Error logging in:", error);
      toast.error("Login failed. Please check your credentials.");
    }

  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex items-center justify-evenly">

      <div className="w-[50%] h-full">

      </div>

      <div className="w-[50%] h-full flex items-center justify-center">

        <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col items-center justify-center gap-[20px]">

          <input onChange={(e) => setEmail(e.target.value)}  type="email" placeholder="Username" value={email} className="w-[300px] h-[50px] rounded-[10px] border-2 border-[#77dec7]"/>
          <input onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="Password" value={password} className="w-[300px] h-[50px] rounded-[10px] border-2 border-[#77dec7]"/>
          <button onClick={handleLogin} className="w-[200px] h-[50px] rounded-[10px] bg-[#77dec7] text-white font-bold text-[20px] cursor-pointer transform hover:scale-102">Login</button>
          <button onClick={googleLogin} className="w-[200px] h-[50px] rounded-[10px] bg-[#77dec7] text-white font-bold text-[20px] cursor-pointer flex items-center justify-center gap-2 transform hover:scale-102">
            <GrGoogle className="text-xl text-[#048065] cursor-pointer" />
            <span className="text-[#000b08] font-bold text-[15px]">Login with Google</span>
          </button>

        </div>

      </div>
      
    </div>
  );
}
