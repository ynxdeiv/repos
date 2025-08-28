import React, { useCallback, useState } from "react";
import { FaGithub, FaPlus, FaBars, FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newRepo) return;
      setLoading(true);

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
          theme: "colored",
        });
      } catch (error) {
        toast.error("Erro ao buscar repositório!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    },
    [newRepo]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }


  const handleDelete = (name) => {
    setRepo((prevRepo) => prevRepo.filter((item) => item.name !== name));
    toast.info("Repositório removido!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

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
            disabled={loading}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <ImSpinner2 className="animate-spin" size={18} />
            ) : (
              <FaPlus size={16} />
            )}
          </button>
        </form>

        <ul className="mt-6 space-y-2">
          {repo.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg"
            >
              <span className="text-gray-800">{item.name}</span>
              <div className="flex gap-2">
                <a
                  href={`https://github.com/${item.name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaBars
                    size={20}
                    className="text-gray-600 hover:text-gray-900 transition"
                  />
                </a>
                <button
                  onClick={() => handleDelete(item.name)}
                  className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </main>
  );
}
