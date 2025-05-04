import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleLogin() {
    
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email: email,
        password: password
      })
      toast.success("Login successful!");
      console.log(response.data);
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

        </div>

      </div>
      
    </div>
  );
}
