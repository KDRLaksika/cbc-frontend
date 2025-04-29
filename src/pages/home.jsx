export default function HomePage() {
  return (
    <div className="w-full h-screen bg-red-100 flex flex-col items-center justify-evenly">
      <div className="w-[650px] h-[650px] bg-red-900 flex flex-col items-center justify-center">
        <div className="relative w-[600px] h-[600px] bg-green-400 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Home Page</h1>
          <p className="text-[15px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  );
}
