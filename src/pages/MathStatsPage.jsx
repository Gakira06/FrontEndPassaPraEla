// frontend/src/pages/MathStatsPage.jsx

import React, { useState, useEffect, useMemo } from "react";
import HeaderUniversal from "../components/layout/HeaderUniversal";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

// ... (O seu objeto ANALISE_MATEMATICA e o componente MathCard permanecem aqui, sem alterações)
const ANALISE_MATEMATICA = {
  exponencial: {
    titulo: "1. Modelo Exponencial: Crescimento de Seguidores",
    formula: "S(t) = 5000 * (1 + 0.05)ᵗ",
    descricao:
      "Este modelo simula o crescimento rápido e acelerado de seguidores no início da carreira. O crescimento é proporcional ao número atual de seguidores.",
    resultadoSimulado:
      "Com 5.000 seguidores iniciais e taxa de 5% ao mês, a projeção é de 9.000 em 1 ano e 27.000 em 3 anos.",
  },
  logistico: {
    titulo: "2. Modelo Logístico: Saturação de Viralização",
    formula: "L(t) = 25000 / (1 + e⁻⁰·³⁽ᵗ⁻¹²⁾)",
    descricao:
      "Este modelo representa a viralização de um post. O crescimento é rápido inicialmente, mas desacelera e estabiliza ao atingir um limite máximo (L=25.000), formando a curva em 'S'.",
    resultadoSimulado:
      "O post alcança um limite de 25.000 curtidas após o pico de viralização.",
  },
  derivada: {
    titulo: "3. Derivadas: A Explosão de uma Arrancada",
    formula: "Velocidade: v(t) = 6.0t + 2. Posição: s(t) = 3.0t² + 2t.",
    descricao:
      "A derivada da posição (s(t)) é a velocidade (v(t)). O backend está a simular uma Aceleração Constante de 6.0 m/s² que é a base para o modelo de esforço físico.",
  },
  integral: (distanciaKm) => ({
    titulo: "4. Integrais: Calculando a Distância Total",
    formula: `Distância = ∫ v(t) dt.`,
    descricao:
      "A Integral da função Velocidade (área abaixo do gráfico) nos dá a Distância Total percorrida (s(t)). O valor no painel de métricas acima representa o esforço total da jogadora.",
    resultadoSimulado: `A distância real percorrida no jogo (via sensor IoT) foi de ${(
      distanciaKm * 1000
    ).toFixed(0)} metros (${distanciaKm.toFixed(2)} km).`,
  }),
};

const MathCard = ({ titulo, formula, descricao, resultadoSimulado }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
    <h3 className="text-2xl font-bold text-gray-800 mb-3">{titulo}</h3>
    <p className="text-xl font-mono text-purple-700 mb-3">{formula}</p>
    <p className="text-gray-600 mb-3">{descricao}</p>
    {resultadoSimulado && (
      <p className="bg-gray-100 p-3 rounded-md text-sm italic text-gray-700">
        <span className="font-semibold">Simulação/IoT:</span>{" "}
        {resultadoSimulado}
      </p>
    )}
  </div>
);

export default function MathStatsPage() {
  const [playerStats, setPlayerStats] = useState({
    distancia_km: 0,
    passos_total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [graphKey, setGraphKey] = useState(Date.now()); // Chave para forçar a atualização da imagem

  const playerId = 1;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://backendpassapraela-producao.onrender.com/jogadoras/${playerId}/stats-fisicas`
        );
        if (!response.ok)
          throw new Error("Falha ao buscar estatísticas do sensor.");
        const data = await response.json();
        setPlayerStats(data);
        // Atualiza a chave do gráfico sempre que os dados são atualizados com sucesso
        setGraphKey(Date.now());
      } catch (err) {
        console.error("Erro no fetch de stats:", err);
      } finally {
        setLoading(false);
      }
    };

    // Busca os dados a cada 3 segundos
    const intervalId = setInterval(fetchStats, 3000);
    return () => clearInterval(intervalId); // Limpa o intervalo ao sair da página
  }, [playerId]);

  // O URL do gráfico agora inclui a chave para evitar problemas de cache do browser
  const graphImageUrl = `https://backendpassapraela-producao.onrender.com/math-stats-image?key=${graphKey}`;

  const integralCardProps = useMemo(
    () => ANALISE_MATEMATICA.integral(playerStats.distancia_km),
    [playerStats.distancia_km]
  );

  return (
    <>
      <HeaderUniversal />
      <div className="bg-gray-50 min-h-screen p-8 font-sans">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-2 text-center">
            Análise Matemática e IoT
          </h1>
          <h2 className="text-2xl text-purple-600 mb-12 text-center">
            Desempenho da Jogadora (ID {playerId})
          </h2>

          <div className="bg-purple-100 p-6 rounded-xl shadow-inner mb-12">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              Métricas do Sensor (Atualizadas em Tempo Real)
            </h3>
            {loading ? (
              <div className="text-center text-gray-600">
                A aguardar dados do sensor...
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-4xl font-extrabold text-purple-600">
                    {playerStats.passos_total}
                  </p>
                  <p className="text-gray-600">Total de Passos</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-purple-600">
                    {playerStats.distancia_km.toFixed(2)} km
                  </p>
                  <p className="text-gray-600">Distância Total</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Gráfico de Desempenho (Dinâmico)
            </h3>
            <div className="bg-white rounded-lg shadow-xl p-4 border flex justify-center items-center">
              <img
                key={graphKey}
                src={graphImageUrl}
                alt="Gráfico de Análise de Desempenho"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MathCard {...ANALISE_MATEMATICA.derivada} />
            <MathCard {...integralCardProps} />
            <MathCard {...ANALISE_MATEMATICA.exponencial} />
            <MathCard {...ANALISE_MATEMATICA.logistico} />
          </div>

          <div className="pt-12 text-center">
            <Link to="/" className="inline-block">
              <button className="bg-gray-800 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg">
                Voltar para a Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
