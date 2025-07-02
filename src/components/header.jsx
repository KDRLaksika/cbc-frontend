import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

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

            <div className="w-[80px] flex items-center justify-center">
                <Link to="/cart" className="text-[20px] font-bold mx-2">
                    <BsCart3/>
                </Link> 
            </div>         
            
        </header>
    )
} 