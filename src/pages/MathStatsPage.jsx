// frontend/src/pages/MathStatsPage.jsx

import React, { useState, useEffect, useMemo } from "react";
import HeaderUniversal from "../components/layout/HeaderUniversal";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

// Hardcode as métricas principais do seu modelo Python para exibição
const ANALISE_MATEMATICA = {
  exponencial: {
    titulo: "1. Modelo Exponencial: O 'boom' inicial de seguidores",
    formula: "S(t) = 5000 * (1 + 0.05)ᵗ",
    descricao:
      "Este modelo simula o crescimento rápido e acelerado (como o juro composto) de seguidores no início da carreira ou após um lance de grande viralização. O crescimento é proporcional ao número atual de seguidores. Esta é a base para o pico de engajamento após um grande jogo.",
    resultadoSimulado:
      "Com 5.000 seguidores iniciais e taxa de 5% ao mês, a projeção é de 9.000 seguidores em 1 ano e 27.000 em 3 anos.",
  },
  logistico: {
    titulo: "2. Modelo Logístico: Quando o crescimento tem um limite",
    formula: "L(t) = 25000 / (1 + e⁻⁰·³⁽ᵗ⁻¹²⁾)",
    descricao:
      "Este modelo representa a viralização de um post. O crescimento é rápido inicialmente (fase exponencial), mas desacelera e estabiliza ao atingir um limite máximo de saturação (L=25.000), formando a curva em 'S'.",
    resultadoSimulado:
      "O post alcança um limite de saturação de 25.000 curtidas após o pico de viralização.",
  }, // Função que aceita a aceleração dinâmica
  derivada: (aceleracao) => ({
    titulo: "3. Derivadas: A Explosão de uma Arrancada (Velocidade)",
    formula: `Velocidade: v(t) = ${aceleracao.toFixed(
      1
    )}t + 2. Posição: s(t) = ${aceleracao.toFixed(1) / 2}t² + 2t.`,
    descricao: `A derivada da posição (s(t)) é a velocidade (v(t)). O backend está simulando uma Aceleração Constante de ${aceleracao.toFixed(
      1
    )} m/s² (derivada da velocidade) que é a base para o modelo de esforço físico.`,
  }), // Função que aceita a distância dinâmica (IoT)
  integral: (distanciaKm) => {
    // Converte KM para Metros e arredonda
    const distanciaMetros = (distanciaKm * 1000).toFixed(0); // Texto de resultado dinâmico

    const resultadoSimulado =
      distanciaKm > 0
        ? `A distância real percorrida no jogo (via sensor IoT) foi de ${distanciaMetros} metros (${distanciaKm} km). Na modelagem matemática, esta distância é a Área sob a Curva da Velocidade (integral).`
        : `O painel de gráficos abaixo mostra como a distância (Integral) é calculada com base na aceleração (Derivada).`;

    return {
      titulo: "4. Integrais: Calculando a Distância Total do Esforço",
      formula: `Distância = ∫ v(t) dt.`,
      descricao:
        "A Integral da função Velocidade (área abaixo do gráfico v(t)) nos dá a Distância Total percorrida (s(t)). O valor no painel de métricas acima representa o esforço total da jogadora na partida, lido pelo sensor.",
      resultadoSimulado: resultadoSimulado,
    };
  },
};

const MathCard = ({ titulo, formula, descricao, resultadoSimulado }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
    <h3 className="text-2xl font-bold text-gray-800 mb-3">{titulo}</h3>
    <p className="text-xl font-mono text-purple-700 mb-3">{formula}</p>
    <p className="text-gray-600 mb-3">{descricao}</p>
    {resultadoSimulado && (
      <p className="bg-gray-100 p-3 rounded-md text-sm italic text-gray-700">
        <span className="font-semibold">Simulação/IoT:</span>
        {resultadoSimulado}
      </p>
    )}
  </div>
);

export default function MathStatsPage() {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true); // NOVOS ESTADOS PARA O GRÁFICO
  const [graphImage, setGraphImage] = useState(null);
  const [graphLoading, setGraphLoading] = useState(true);
  const [graphError, setGraphError] = useState(null);

  const playerId = 1; // --- 1. Efeito para buscar os dados do sensor ---

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/jogadoras/${playerId}/stats-fisicas`
        );
        if (!response.ok) throw new Error("Falha ao buscar estatísticas.");
        const data = await response.json();
        setPlayerStats(data);
      } catch (err) {
        console.error("Erro no fetch de stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [playerId]);

  const accelerationValue = playerStats?.aceleracao_simulada || 6.0;
  const distanceKm = playerStats?.distancia_km || 0.0;
  const stepsTotal = playerStats?.passos_total || 0; // --- 2. Efeito para buscar o gráfico DINÂMICO (Executa o Python) ---

  useEffect(() => {
    // Só tenta buscar o gráfico se o primeiro useEffect tiver terminado de carregar
    if (loading) return;

    const fetchGraph = async () => {
      setGraphLoading(true);
      setGraphError(null);
      try {
        // FAZ A REQUISIÇÃO PARA O ENDPOINT NODE.JS QUE EXECUTA O PYTHON
        const response = await fetch(
          `http://localhost:3001/math-analytics/graph?distancia=${distanceKm}&aceleracao=${accelerationValue}`
        );
        const data = await response.json();
        if (!response.ok || data.message) {
          // Se o backend retornar 500 (response.ok é false) ou uma mensagem de erro
          throw new Error(
            data.message ||
              "Falha ao gerar gráfico. Verifique o terminal do Node.js."
          );
        } // Renderiza o SVG Base64 retornado pelo Python
        setGraphImage(`data:image/svg+xml;base64,${data.imageBase64}`);
      } catch (err) {
        console.error("Erro ao carregar gráfico:", err);
        setGraphError(`Erro ao carregar o gráfico: ${err.message}`);
      } finally {
        setGraphLoading(false);
      }
    };

    fetchGraph();
  }, [loading, distanceKm, accelerationValue]); // Recarrega se os dados do sensor mudarem // Cálculos para os cards estáticos

  const derivativeCardProps = useMemo(
    () => ANALISE_MATEMATICA.derivada(accelerationValue),
    [accelerationValue]
  );
  const integralCardProps = useMemo(
    () => ANALISE_MATEMATICA.integral(distanceKm),
    [distanceKm]
  );

  if (graphError) {
    // Exibe o erro de forma clara na tela
    return (
      <div className="p-8 text-center text-red-700 bg-red-100 min-h-screen">
        <HeaderUniversal />
        <h1 className="text-4xl font-bold mt-12">Erro Crítico</h1>
        <p className="mt-4 text-xl">
          Não foi possível carregar o gráfico de análise.
        </p>
        <p className="font-mono text-sm mt-4 p-4 border rounded bg-white max-w-lg mx-auto">
          {graphError}
        </p>
        <p className="mt-6">
          Por favor, verifique se seu servidor Node.js está rodando e se as
          dependências Python (numpy, matplotlib) estão instaladas corretamente
          no seu ambiente virtual (`math-analytics/.venv`).
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <HeaderUniversal />
      <div className="bg-gray-50 min-h-screen p-8 font-sans">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-2 text-center">
            Análise Matemática e IoT
          </h1>
          <h2 className="text-2xl text-purple-600 mb-12 text-center">
            Conectando o Desempenho da Jogadora (ID {playerId}) com a Modelagem
          </h2>
          <div className="bg-purple-100 p-6 rounded-xl shadow-inner mb-12">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              Métricas do Sensor (IoT - Dinâmicas)
            </h3>
            {loading ? (
              <div className="text-center text-gray-600">
                Carregando dados do sensor...
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-extrabold text-purple-600">
                    {stepsTotal}
                  </p>
                  <p className="text-gray-600">Total de Passos</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-purple-600">
                    {distanceKm.toFixed(2)} km
                  </p>
                  <p className="text-gray-600">Distância Total (Jogo)</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-green-600">
                    {accelerationValue.toFixed(1)} m/s²
                  </p>
                  <p className="text-gray-600">Aceleração Máxima (Modelo)</p>
                </div>
              </div>
            )}
          </div>
          {/* Área de Exibição do Gráfico Dinâmico */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Painel de Análise Completo (Gráfico Matplotlib)
            </h3>
            {graphLoading ? (
              <div className="text-center p-12 bg-white rounded-lg shadow-xl">
                Carregando gráfico dinâmico...
              </div>
            ) : graphImage ? (
              <img
                // Renderiza a imagem Base64 como SVG
                src={graphImage}
                alt="Gráfico de Análise Matemática e Engajamento"
                className="w-full h-auto bg-white rounded-lg shadow-xl p-4"
              />
            ) : (
              <div className="text-center p-12 bg-white rounded-lg shadow-xl text-red-500">
                {graphError || "Erro: Gráfico não foi gerado pelo Python."}
              </div>
            )}
          </div>
          {/* Explicação dos Modelos */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-800 text-center border-b pb-4">
              A Lógica por Trás da Simulação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cards dinâmicos baseados nos dados do sensor */}
              <MathCard {...derivativeCardProps} />
              <MathCard {...integralCardProps} />
              {/* Cards estáticos da simulação de marketing */}
              <MathCard {...ANALISE_MATEMATICA.exponencial} />
              <MathCard {...ANALISE_MATEMATICA.logistico} />
            </div>
            <div className="pt-8 text-center">
              <Link to="/" className="inline-block">
                <button className="bg-gray-800 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg">
                  Voltar para a Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
