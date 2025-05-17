import {Link} from "react-router-dom";
import UserData from "./userData";
import { use } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {

     const navigate = useNavigate();

    return(
        <header className="w-full h-[80px] shadow-2xl flex">

            <img onClick={() => navigate("/")} src="/logo.png" alt="Logo" className="w-[80px] h-[70px] object-cover cursor-pointer top-0 left-0 m-2" />
            <div className="w-[calc(100%-160px)] h-full flex items-center justify-center">
                <Link to="/" className=" text-2xl font-bold">Home</Link>
                <Link to="/products" className="text-2xl font-bold ml-4">Products</Link>
                <Link to="/about" className="text-2xl font-bold ml-4">About</Link>
                <Link to="/Contact" className="text-2xl font-bold ml-4">Contact</Link>
                
                
            </div>

            <div className="w-[80px] bg-blue-600"> 
            </div>         
            
        </header>
    )
} 