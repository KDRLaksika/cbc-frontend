import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
           await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/",
        {
          email,
          firstName,
          lastName,
          password
        }
      );
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Try again with valid details.");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex items-center justify-evenly">
      <div className="w-[50%] h-full"></div>

      <div className="w-[50%] h-full flex items-center justify-center">
        <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col items-center justify-center gap-[20px]">

          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First Name"
            value={firstName}
            className="w-[300px] h-[50px] rounded-[10px] border-2 border-[#77dec7]"
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            value={lastName}
            className="w-[300px] h-[50px] rounded-[10px] border-2 border-[#77dec7]"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
            className="w-[300px] h-[50px] rounded-[10px] border-2 border-[#77dec7]"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
            className="w-[300px] h-[50px] rounded-[10px] border-2 border-[#77dec7]"
          />

          <button
            onClick={handleRegister}
            className="w-[200px] h-[50px] rounded-[10px] bg-[#77dec7] text-white font-bold text-[20px] cursor-pointer transform hover:scale-102"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
