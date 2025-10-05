import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import HeaderUniversal from "../components/layout/HeaderUniversal"

// Definição dos campos de estatísticas para renderização dinâmica
const statFields = [
  { name: "gols", label: "Gols" },
  { name: "assistencias", label: "Assistências" },
  { name: "finalizacoes", label: "Finalizações" },
  { name: "desarmes", label: "Desarmes" },
  { name: "defesas", label: "Defesas (Goleira)" },
  { name: "gol_sofrido", label: "Gols Sofridos (Goleira)" },
  { name: "cartao_amarelo", label: "C. Amarelo" },
  { name: "cartao_vermelho", label: "C. Vermelho" },
];

export default function AdminDashboard() {
  const [jogadoras, setJogadoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mercadoStatus, setMercadoStatus] = useState("aberto");

  // Efeito que busca os dados iniciais (jogadoras e status do mercado) ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jogadorasResponse = await fetch(
          "http://localhost:3001/jogadoras"
        );
        if (!jogadorasResponse.ok)
          throw new Error("Falha ao buscar jogadoras.");
        const jogadorasData = await jogadorasResponse.json();
        setJogadoras(jogadorasData);

        const mercadoResponse = await fetch(
          "http://localhost:3001/mercado/status"
        );
        if (!mercadoResponse.ok)
          throw new Error("Falha ao buscar status do mercado.");
        const mercadoData = await mercadoResponse.json();
        setMercadoStatus(mercadoData.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Atualiza o estado local das jogadoras conforme o admin digita nos inputs
  const handleStatChange = (jogadoraId, field, value) => {
    setJogadoras((prevJogadoras) =>
      prevJogadoras.map((j) =>
        j.id === jogadoraId ? { ...j, [field]: Number(value) } : j
      )
    );
  };

  // Envia as estatísticas atualizadas de uma jogadora para o backend
  const handleSaveStats = async (jogadoraId) => {
    const jogadora = jogadoras.find((j) => j.id === jogadoraId);
    if (!jogadora) return;

    // Monta o corpo da requisição com os dados do estado
    const statsData = {
      gols: jogadora.gols || 0,
      assistencias: jogadora.assistencias || 0,
      finalizacoes: jogadora.finalizacoes || 0,
      desarmes: jogadora.desarmes || 0,
      defesas: jogadora.defesas || 0,
      gol_sofrido: jogadora.gol_sofrido || 0,
      cartao_amarelo: jogadora.cartao_amarelo || 0,
      cartao_vermelho: jogadora.cartao_vermelho || 0,
    };

    Swal.fire({
      title: "Salvando...",
      text: "Atualizando as estatísticas da jogadora.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        `http://localhost:3001/jogadoras/${jogadoraId}/stats`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(statsData),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Falha ao salvar.");

      // Atualiza a pontuação da jogadora na tela com o valor retornado pelo backend
      setJogadoras((prev) =>
        prev.map((j) =>
          j.id === jogadoraId ? { ...j, pontuacao: result.novaPontuacao } : j
        )
      );

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Salvo!",
        text: result.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Erro ao salvar: ${err.message}`,
        confirmButtonColor: "#EF4444", // Vermelho
      });
    }
  };

  // ===================================================================================
  // ===== LÓGICA DE CONTROLE DE MERCADO NO FRONTEND (ATUALIZADA) ======================
  // ===================================================================================
  const handleToggleMercado = async () => {
    // Determina qual será o próximo estado do mercado
    const novoStatus = mercadoStatus === "aberto" ? "fechado" : "aberto";

    // Define uma mensagem de confirmação clara para o admin, explicando o que cada ação faz
    const resultConfirm = await Swal.fire({
      title:
        novoStatus === "fechado"
          ? "Fechar o Mercado?"
          : "Apurar e Abrir Mercado?",
      html:
        novoStatus === "fechado"
          ? "<b>Passo 1 de 2:</b><br/>Fechar o mercado irá <b>travar</b> as escalações de todos os usuários. Você poderá então atualizar as pontuações."
          : "<b>Passo 2 de 2:</b><br/>Esta ação irá <b>apurar</b> a pontuação, <b>atualizar</b> o ranking e <b>zerar</b> tudo para a próxima rodada.<br/><br/><b class='text-red-600'>Esta ação é irreversível.</b>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: novoStatus === "fechado" ? "#EF4444" : "#22C55E", // Vermelho para fechar, Verde para abrir
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Sim, continuar!",
      cancelButtonText: "Cancelar",
    });

    if (resultConfirm.isConfirmed) {
      Swal.fire({
        title: "Processando...",
        text: "Aguarde enquanto o status do mercado é atualizado.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        // Envia a requisição para o backend com o novo status desejado
        const response = await fetch("http://localhost:3001/mercado/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: novoStatus }),
        });
        const result = await response.json();
        if (response.ok) {
          // Se a requisição foi bem-sucedida, atualiza o estado local e exibe a mensagem de sucesso
          setMercadoStatus(novoStatus);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: result.message,
            confirmButtonColor: "#8B5CF6",
          });
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Erro na Operação",
          text: err.message,
        });
      }
    }
  };
  // ===================================================================================
  // ===== FIM DA LÓGICA DE CONTROLE DE MERCADO ========================================
  // ===================================================================================

  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (error)
    return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  return (
    <>
    <HeaderUniversal />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Painel de Administração</h1>

        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Controle de Rodada</h2>
          <p className="mb-4">
            O mercado está atualmente:{" "}
            <span className="font-bold">{mercadoStatus.toUpperCase()}</span>
          </p>
          <button
            onClick={handleToggleMercado}
            className={`py-2 px-6 rounded-lg text-white font-bold ${
              mercadoStatus === "aberto"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {mercadoStatus === "aberto"
              ? "1. FECHAR MERCADO"
              : "2. APURAR PONTOS E ABRIR MERCADO"}
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-4">Pontuação das Jogadoras</h2>
        <div className="space-y-6">
          {jogadoras.map((jogadora) => (
            <div
              key={jogadora.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:3001${jogadora.url_imagem}`}
                    alt={jogadora.nome}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{jogadora.nome}</h2>
                    <p className="text-gray-600">{jogadora.posicao}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg">Pontuação na Rodada</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {(jogadora.pontuacao || 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {statFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={jogadora[field.name] || 0}
                      onChange={(e) =>
                        handleStatChange(
                          jogadora.id,
                          field.name,
                          e.target.value
                        )
                      }
                      className="mt-1 w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
              {/* O botão de salvar pontuação agora é desabilitado se o mercado estiver aberto */}
              <button
                onClick={() => handleSaveStats(jogadora.id)}
                disabled={mercadoStatus === "aberto"}
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Salvar Pontuação
              </button>
              {mercadoStatus === "aberto" && (
                <p className="text-sm text-gray-500 mt-2">
                  Você só pode salvar a pontuação com o mercado fechado.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
