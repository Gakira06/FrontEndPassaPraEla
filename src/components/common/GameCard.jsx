// src/components/common/GameCard.jsx
import Icon from "../common/Icon";
import Play from "../../assets/icons/play-fill.svg?react";

export default function GameCard({ game }) {
  return (
    <div
      className="flex-shrink-0 w-80 bg-white bg-cover bg-center text-gray-800 rounded-lg p-4 flex items-center justify-between shadow-[0_4px_4px_0_rgba(0,0,0,0.07)_inset,0_10px_10px_0_rgba(0,0,0,0.18)]"
      style={{ backgroundImage: "url(<path-to-image>)" }}
    >
      <div className="flex flex-col gap-4 justify-center h-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span className="font-semibold">{game.teamA}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span className="font-semibold">{game.teamB}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <span className="font-bold text-lg">{game.time}</span>
        <button className="rounded border-none bg-gray-200 bg-opacity-40 px-4 mt-2 flex items-center gap-2 text-3">
          <Icon svg={Play} className="fill-[#5F007E99]  " />
          Assista
        </button>
      </div>
    </div>
  );
}
