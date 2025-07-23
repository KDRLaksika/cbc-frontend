import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {

     const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
     const navigate = useNavigate();
     const token = localStorage.getItem("token");

    return(
        <header className="w-full h-[80px] shadow-1xl flex justify-center relative bg-pink-200">

            <GiHamburgerMenu className="h-full text-3xl md:hidden absolute left-2" onClick={() => {setSideDrawerOpened(true)}}/>

            <img onClick={() => navigate("/")} src="/logo.png" alt="Logo" className="w-[90px] h-[80px] object-cover  cursor-pointer top-0 left-0 " />
            <div className="w-[calc(100%-160px)] h-full hidden md:flex items-center justify-center">
                <Link to="/" className=" text-2xl font-bold">Home</Link>
                <Link to="/products" className="text-2xl font-bold ml-4">Products</Link>
                <Link to="/about" className="text-2xl font-bold ml-4">About</Link>
                <Link to="/Contact" className="text-2xl font-bold ml-4">Contact</Link>
                <Link to="/search" className="text-2xl font-bold ml-4">Search</Link>
                
                
            </div>

            <div className="w-[160px] hidden md:flex items-center justify-center">
                {
                    token == null ?
                    <Link to="/login" className="text-[20px] font-bold mx-2">Logout</Link>
                    :
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.href = "/";
                    }} className="text-[20px] font-bold mx-2">Logout</button>
                }
                <Link to="/cart" className="text-[20px] font-bold mx-2">
                    <BsCart3/>
                </Link> 
            </div>

            {
                sideDrawerOpened&&
                <div className="fixed  h-screen w-full bg-[#00000060] flex md:hidden">
                    <div className="w-[350px] bg-white h-full">
                        <div className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                            <GiHamburgerMenu className="h-full text-3xl absolute left-2 cursor-pointer" onClick={()=>{
                                setSideDrawerOpened(false)
                            }} />
                            <img onClick={()=>{
                                window.location.href = "/"
                            }} src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer"/>

                        </div>
                        <div className="w-full h-[calc(100%-80px)] flex flex-col items-center gap-2">
                            <a href="/" className="text-[20px] font-bold mx-2 my-4">Home</a>
                            <a href="/products" className="text-[20px] font-bold mx-2 my-4">Products</a>
                            <a href="/about" className="text-[20px] font-bold mx-2 my-4">About</a>
                            <a href="/contact" className="text-[20px] font-bold mx-2 my-4">Contact</a>
                            <a href="/search" className="text-[20px] font-bold mx-2 my-4">Search</a>
                            {
                                token == null ?
                                <a href="/login" className="text-[20px] font-bold mx-2 my-4">Logout</a>
                                :
                                <button onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    window.location.href = "/";
                                }} className="text-[20px] font-bold mx-2 my-4">Logout</button>
                            }
                            <a href="/cart" className="text-[20px] font-bold mx-2 my-4">
                                <BsCart3 />
                            </a>
                        </div>

                    </div>

                </div>
            }        
            
        </header>
    )
} 