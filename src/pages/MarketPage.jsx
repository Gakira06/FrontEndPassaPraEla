import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTeam } from "../context/useTeam";

// O CardJogadora agora recebe a informação se o mercado está fechado
const CardJogadora = ({ jogadora, posicao, jaSelecionada, mercadoFechado }) => {
  const { escalarJogadora } = useTeam();
  const navigate = useNavigate();

  const handleEscalar = () => {
    // Não faz nada se o botão estiver desabilitado
    if (jaSelecionada || mercadoFechado) return;
    
    escalarJogadora(posicao, jogadora);
    navigate("/teams");
  };

  const isButtonDisabled = jaSelecionada || mercadoFechado;
  let buttonText = "Escalar";
  if (jaSelecionada) buttonText = "Já Escalada";
  if (mercadoFechado) buttonText = "Mercado Fechado";


  return (
    <article className={`bg-white rounded-xl shadow-md p-3 flex items-center justify-between space-x-4 ${isButtonDisabled ? 'opacity-60' : ''}`}>
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-shrink-0">
          <img
            src={`http://localhost:3001${jogadora.url_imagem}`}
            alt={`Foto de ${jogadora.nome}`}
            className="h-20 w-20 object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{jogadora.nome}</h3>
          <p className="text-gray-500">{jogadora.posicao}</p>
          <p className="text-sm text-purple-700 font-semibold">{jogadora.nome_time}</p>
        </div>
      </div>
      <div className="w-48 flex justify-end">
        <button
          onClick={handleEscalar}
          className={`font-bold py-2 px-6 rounded-lg transition-colors duration-300 ${
            isButtonDisabled
              ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
};

const PaginaSelecaoJogadoras = () => {
  const [params] = useSearchParams();
  const posicaoQuery = params.get("posicao");
  
  const { team } = useTeam(); 

  const [jogadoras, setJogadoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NOVO: Estado para o status do mercado
  const [mercadoAberto, setMercadoAberto] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
          // Busca jogadoras e status do mercado em paralelo
          const [jogadorasRes, mercadoRes] = await Promise.all([
              fetch("http://localhost:3001/jogadoras"),
              fetch("http://localhost:3001/mercado/status")
          ]);

          if (!jogadorasRes.ok) throw new Error("Não foi possível buscar os dados das jogadoras.");
          if (!mercadoRes.ok) throw new Error("Não foi possível verificar o status do mercado.");

          const jogadorasData = await jogadorasRes.json();
          const mercadoData = await mercadoRes.json();
          
          setJogadoras(jogadorasData);
          setMercadoAberto(mercadoData.status === 'aberto');

        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  }, []);

  const mapeamentoPosicao = {
      GOL: "Goleira", DEF: "Zagueira", MEI: "Meio-campo", ATA: "Atacante"
  };
  const tipoPosicao = posicaoQuery.replace(/[0-9]/g, ''); 
  const nomePosicaoFiltro = mapeamentoPosicao[tipoPosicao];

  const jogadorasFiltradas = jogadoras.filter(j => j.posicao === nomePosicaoFiltro);
  
  const idsJogadorasSelecionadas = new Set(Object.values(team).filter(p => p).map(p => p.id));

  if (loading) return <div className="text-center p-8">Carregando...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Erro: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-4">Selecione para a posição: {nomePosicaoFiltro}</h2>
        {jogadorasFiltradas.length > 0 ? (
          jogadorasFiltradas.map((jogadora) => (
            <CardJogadora
              key={jogadora.id}
              jogadora={jogadora}
              posicao={posicaoQuery}
              jaSelecionada={idsJogadorasSelecionadas.has(jogadora.id)}
              mercadoFechado={!mercadoAberto} // Passa a informação para o card
            />
          ))
        ) : (
          <p>Nenhuma jogadora encontrada para esta posição.</p>
        )}
      </div>
    </div>
  );
};

export default PaginaSelecaoJogadoras;