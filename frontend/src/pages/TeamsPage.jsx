import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../context/useTeam";
import fieldImage from "../assets/campo.jpg";
import HeaderUniversal from "../components/layout/HeaderUniversal";
import Footer from "../components/layout/Footer";
import Swal from "sweetalert2";

function TeamsPage() {
  const navigate = useNavigate();
  const { team, teamName, clearTeam } = useTeam();
  const [mercadoAberto, setMercadoAberto] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMercadoStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/mercado/status");
        const data = await response.json();
        const isMarketOpen = data.status === "aberto";

        const oldStatus = localStorage.getItem("mercadoStatus");
        if (oldStatus === "fechado" && isMarketOpen) {
          clearTeam();
        }

        setMercadoAberto(isMarketOpen);
        localStorage.setItem("mercadoStatus", data.status);
      } catch (error) {
        console.error("Erro ao buscar status do mercado:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMercadoStatus();
  }, [clearTeam]);

  const positions = [
    { key: "GOL", label: "GOL", top: "85%", left: "50%" },
    { key: "DEF1", label: "DEF", top: "60%", left: "35%" },
    { key: "DEF2", label: "DEF", top: "60%", left: "65%" },
    { key: "MEI1", label: "MEI", top: "40%", left: "20%" },
    { key: "MEI2", label: "MEI", top: "40%", left: "80%" },
    { key: "ATA1", label: "ATA", top: "20%", left: "35%" },
    { key: "ATA2", label: "ATA", top: "20%", left: "65%" },
  ];

  const handleSlotClick = (posicao) => {
    if (mercadoAberto) {
      navigate(`/marketplace?posicao=${posicao}`);
    } else {
      Swal.fire({
        icon: "info",
        title: "Mercado Fechado",
        text: "Você não pode alterar sua escalação enquanto o mercado estiver fechado. Aguarde a apuração da rodada!",
        confirmButtonColor: "#8B5CF6",
      });
    }
  };

  if (loading) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  return (
    <>
      <HeaderUniversal />
      <div className="min-h-screen bg-gray-900 font-sans">
        <main className="max-w-full mx-auto p-8 bg-white">
          <h2 className="text-4xl font-bold text-purple-600 mb-2">
            {teamName}
          </h2>
          <h3 className="text-2xl font-semibold text-gray-500 mb-6">
            Sua Escalação
          </h3>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-2/3 relative">
              {!mercadoAberto && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-md">
                  <h2 className="text-white text-4xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
                    MERCADO FECHADO
                  </h2>
                </div>
              )}
              <img
                src={fieldImage}
                alt="Campo de futebol"
                className="w-full h-auto"
              />
              {positions.map((pos) => {
                const jogadora = team[pos.key];
                const slotClasses = `absolute text-center transition-opacity ${
                  !mercadoAberto
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer"
                }`;
                return (
                  <div
                    key={pos.key}
                    className={slotClasses}
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => handleSlotClick(pos.key)}
                  >
                    {jogadora ? (
                      <>
                        <img
                          src={"http://localhost:3001" + jogadora.url_imagem}
                          alt={jogadora.nome}
                          className="rounded-full h-16 w-16 object-cover border-2"
                        />
                        <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                          {pos.label}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center border-2">
                          <span className="text-4xl text-purple-700">+</span>
                        </div>
                        <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                          {pos.label}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg text-black">
              <ul className="space-y-3 mb-6">
                {positions.map((pos) => (
                  <li
                    key={pos.key}
                    className="flex justify-between items-center text-lg"
                  >
                    <span>
                      <span className="font-bold">{pos.label}</span> -{" "}
                      {team[pos.key]?.nome || "Vazio"}
                    </span>
                    <span className="font-bold text-green-400">
                      {team[pos.key]?.pontuacao.toFixed(2) || "0.00"}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-600 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>PONTOS:</span>
                  <span>
                    {positions
                      .reduce(
                        (acc, pos) => acc + (team[pos.key]?.pontuacao || 0),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default TeamsPage;
