export default function SignUpPage() {
    return (
        <div className="w-full h-screen bg-red-100 flex flex-col items-center justify-evenly">
            <div className="w-[650px] h-[650px] bg-red-900 flex flex-col items-center justify-center">
                <div className="relative w-[600px] h-[600px] bg-green-400 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold">Sign Up</h1>
                    <form className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            placeholder="Username"
                            className="mb-4 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="mb-4 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="mb-4 p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}