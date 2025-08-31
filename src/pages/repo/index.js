import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Repo() {
  const { repo } = useParams();
  const [repositorio, setRepositorio] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${repo}`),
          api.get(`/repos/${repo}/issues`, {
            params: {
              state: "open",
              per_page: 5,
            },
          }),
        ]);

        setRepositorio(repositorioData.data);
        setIssues(issuesData.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [repo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-white animate-pulse">
          Carregando...
        </h1>
      </div>
    );
  }

  if (!repositorio) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-white">
          Repositório não encontrado
        </h1>
      </div>
    );
  }

  return (

      <div className="max-w-3xl mx-auto p-6">
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-white hover:text-indigo-600 transition-colors"
      >
        <BiArrowBack size={24} className="mr-2" />
        <span className="font-medium">Voltar</span>
      </Link>
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-6">      
        {repositorio.owner && (
          <img
            src={repositorio.owner.avatar_url}
            alt="Avatar do dono"
            className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-black">
            {repositorio.name}
          </h1>
          <p className="text-black mt-2">{repositorio.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Issues abertas
        </h2>
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-200"
            >
              <a
                href={issue.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 font-medium hover:underline"
              >
                {issue.title}
              </a>
              <p className="text-sm text-gray-500 mt-1">
                Aberta por{" "}
                <span className="font-semibold">{issue.user.login}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
