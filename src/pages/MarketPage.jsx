import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTeam } from "../context/useTeam";

// 1. Pega a URL da API das variáveis de ambiente <-- MUDANÇA AQUI
const apiUrl = import.meta.env.VITE_API_URL;

const CardJogadora = ({ jogadora, posicao }) => {
  const { escalarJogadora } = useTeam();
  const navigate = useNavigate();

  const handleEscalar = () => {
    escalarJogadora(posicao, jogadora);
    navigate("/teams");
  };

  return (
    <article className="bg-white rounded-xl shadow-md p-3 flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-shrink-0">
          <img
            // 2. Usa a variável apiUrl para a imagem <-- MUDANÇA AQUI
            src={apiUrl + jogadora.url_imagem} 
            alt={`Foto de ${jogadora.nome}`}
            className="h-20 w-20 object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{jogadora.nome}</h3>
          <p className="text-gray-500">{jogadora.posicao}</p>
        </div>
      </div>

      <div className="w-48 flex justify-end">
        <button
          onClick={handleEscalar}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Escalar
        </button>
      </div>
    </article>
  );
};

const PaginaSelecaoJogadoras = () => {
  const [params] = useSearchParams();
  const posicao = params.get("posicao");

  const [jogadoras, setJogadoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJogadoras = async () => {
      try {
        // 3. Usa a variável apiUrl para a chamada da API <-- MUDANÇA AQUI
        const response = await fetch(`${apiUrl}/jogadoras`);
        if (!response.ok) {
          throw new Error("Não foi possível buscar os dados das jogadoras.");
        }
        const data = await response.json();
        setJogadoras(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJogadoras();
  }, []); 

  if (loading) {
    return <div className="text-center p-8">Carregando jogadoras...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          Selecione uma jogadora para {posicao}
        </h2>
        {jogadoras.map((jogadora) => (
          <CardJogadora key={jogadora.id} jogadora={jogadora} posicao={posicao} />
        ))}
      </div>
    </div>
  );
};

export default PaginaSelecaoJogadoras;