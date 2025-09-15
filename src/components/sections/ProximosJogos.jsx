// src/components/sections/ProximosJogos.jsx
import GameCard from "../common/GameCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProximosJogos() {
  // Dados de exemplo (virão de uma API no futuro)
  const games = [
    { id: 1, teamA: "Palmeiras", teamB: "Corinthians", time: "15:30" },
    { id: 2, teamA: "Santos", teamB: "Corinthians", time: "15:30" },
    { id: 3, teamA: "São Paulo", teamB: "Corinthians", time: "15:30" },
  ];

  return (
    <section className="py-12 px-6 md:px-10 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Próximos Jogos</h2>
          <div className="flex gap-2">
            <button className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition">
              <ChevronLeft className="text-gray-800" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition">
              <ChevronRight className="text-gray-800" />
            </button>
          </div>
        </div>
        <div className="flex gap-20 overflow-x-auto pb-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
