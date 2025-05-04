import React, { useState } from 'react';

export default function TestPage() {

    const [count, setCount] = useState(0);
    const [status, setStatus] = useState("Passed");

    return(
        <div className="w-full h-screen flex justify-center items-center">

            <div className="w-[450px] h-[300px] shadow-lg border-2 flex justify-center items-center mx-[10px]">

                <button onClick={() => {

                    setCount(count - 1);
                }} className="bg-blue-500 text-white font-bold w-[100px] h-[60px] text-[20px] cursor-pointer">-</button>

                <span className="text-[50px] font-bold text-stone-950 mx-[20px] flex justify-center items-center">{count}</span>

                <button onClick={() => {

                    setCount(count + 1);
                }} className="bg-blue-500 text-white font-bold w-[100px] h-[60px] text-[20px] cursor-pointer">+</button>

            </div>

            

            <div className="w-[450px] h-[300px] shadow-lg border-2 flex flex-col justify-center items-center mx-[10px]">

                <span className="text-[50px] font-bold text-stone-950 mb-[20px] flex justify-center items-center">{status}</span>

                <div className="flex justify-center items-center space-x-[20px]">

                    <button onClick={() => {

                        setStatus("Passed");
                    }} className="bg-blue-500 text-white font-bold w-[100px] h-[60px] text-[20px] cursor-pointer">Passed</button>

                    <button onClick={() => {

                        setStatus("Failed");
                    }} className="bg-blue-500 text-white font-bold w-[100px] h-[60px] text-[20px] cursor-pointer">Failed</button>

                </div>

            </div>

            
            
        </div>
    )
}