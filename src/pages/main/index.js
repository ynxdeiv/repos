import React, { useCallback, useState } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repo, setRepo] = useState([]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!newRepo) return; 

      try {
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name,
        };

        setRepo((prevRepo) => [...prevRepo, data]);
        setNewRepo("");

        toast.success("Repositório adicionado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        console.log(repo);
      } catch (error) {
        toast.error("Erro ao buscar repositório!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    },
    [newRepo, repo]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-[700px] w-full bg-white rounded-xl p-8 shadow-2xl">
        <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <FaGithub size={28} className="text-gray-900" />
          Meus Repositórios
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-row items-center gap-2"
        >
          <input
            value={newRepo}
            type="text"
            placeholder="Adicionar repositório..."
            onChange={handleInputChange}
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

      <ToastContainer />
    </main>
  );
}
