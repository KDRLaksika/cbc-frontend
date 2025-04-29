export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-red-100 flex flex-col items-center justify-evenly">
      <div className="w-[650px] h-[650px] bg-red-900 flex flex-col items-center justify-center">
        <div className="relative w-[600px] h-[600px] bg-green-400 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <form className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Username"
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
