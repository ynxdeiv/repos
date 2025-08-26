import React, {useState}from "react";
import { FaGithub, FaPlus } from "react-icons/fa";

export default function Main() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-[700px] w-full bg-white rounded-xl p-8 shadow-2xl">
        <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <FaGithub size={28} className="text-gray-900" />
          Meus Repositórios
        </h1>

        <form
          onSubmit={() => {}}
          className="mt-6 flex flex-row items-center gap-2"
        >
          <input
            type="text"
            placeholder="Adicionar repositório..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center shadow-md"
          >
            <FaPlus size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
