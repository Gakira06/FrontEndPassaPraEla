// frontend/src/pages/PlayerStatsPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderUniversal from "../components/layout/HeaderUniversal";
import Footer from "../components/layout/Footer";

const StatCard = ({ label, value, unit }) => (
  <div className="bg-purple-100 p-6 rounded-lg text-center shadow-md">
    <p className="text-xl text-purple-800 font-semibold">{label}</p>
    <p className="text-5xl font-bold text-purple-600 mt-2">
      {value} <span className="text-2xl">{unit}</span>
    </p>
  </div>
);

export default function PlayerStatsPage() {
  const { id } = useParams(); // Pega o ID da jogadora do URL
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- ADICIONADO PARA DEBUG ---
    // Este log vai mostrar-nos no browser o valor de 'id' que o React está a ver.
    console.log("O parâmetro ID do URL é:", id);

    const fetchStats = async () => {
      // Condição de segurança: Se o 'id' não for válido, não fazemos o fetch.
      if (!id) {
        console.log("ID ainda não está disponível, a aguardar...");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/jogadoras/${id}/stats-fisicas`
        );

        if (!response.ok) {
          throw new Error(
            `Servidor respondeu com ${response.status}. Verifique se o ID ${id} existe na base de dados.`
          );
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Chama a função imediatamente
    fetchStats();

    // E continua a atualizar a cada 3 segundos
    const intervalId = setInterval(fetchStats, 3000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [id]); // Executa sempre que o 'id' mudar

  if (loading && !stats)
    return <div className="p-8 text-center">A carregar estatísticas...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        <b>Erro:</b> {error}
      </div>
    );

  return (
    <>
      <HeaderUniversal />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Estatísticas em Tempo Real
          </h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-8">
            {stats?.nome || "Jogadora"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatCard
              label="Total de Passos"
              value={stats?.passos_total || 0}
              unit="passos"
            />
            <StatCard
              label="Distância Percorrida"
              value={stats?.distancia_km || 0}
              unit="km"
            />
          </div>
          <p className="mt-8 text-gray-500">
            Estes dados são atualizados automaticamente a partir do sensor.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
