import {Link} from "react-router-dom";
import UserData from "./userData";

export default function Header() {
    return(
        <div className="bg-gray-800 text-white p-4 flex flex-col items-center justify-center">           
            <nav className="flex space-x-4 mb-4">
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
                <a href="https://google.com" className="text-white hover:text-gray-300">Google</a>
            </nav>
            <UserData />
        </div>
    )
} 