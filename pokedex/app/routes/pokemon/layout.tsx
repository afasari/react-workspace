import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-600">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Pokédex
        </h1>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}