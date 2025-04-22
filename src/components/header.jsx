import UserData from "./userData";

export default function Header() {
    return(
        <div className="bg-gray-800 text-white p-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Crystal Beauty Clear</h1>
            <p className="text-[15px]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <UserData />
        </div>
    )
} 