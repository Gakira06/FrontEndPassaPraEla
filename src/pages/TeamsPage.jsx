import fieldImage from "../assets/campo.jpg";
import HeaderTeamPage from "../components/componentsTeamsPage/HeaderTeamPage";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../context/useTeam";
function TeamsPage() {
  const navigate = useNavigate();
  const { team } = useTeam();

  const positions = [
    { key: "GOL", label: "GOL", top: "85%", left: "50%" },
    { key: "DEF1", label: "DEF", top: "60%", left: "35%" },
    { key: "DEF2", label: "DEF", top: "60%", left: "65%" },
    { key: "MEI1", label: "MEI", top: "40%", left: "20%" },
    { key: "MEI2", label: "MEI", top: "40%", left: "80%" },
    { key: "ATA1", label: "ATA", top: "20%", left: "35%" },
    { key: "ATA2", label: "ATA", top: "20%", left: "65%" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <HeaderTeamPage />

      <main className="max-w-full mx-auto p-8 bg-white">
        <h2 className="text-4xl font-bold text-purple-400 mb-6">
          Sua Escalação
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Campo */}
          <div className="w-full lg:w-2/3 relative">
            <img
              src={fieldImage}
              alt="Campo de futebol"
              className="w-full h-auto"
            />

            {positions.map((pos) => {
              const jogadora = team[pos.key];
              return (
                <div
                  key={pos.key}
                  className="absolute text-center cursor-pointer"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => navigate(`/marketplace?posicao=${pos.key}`)}
                >
                  {jogadora ? (
                    <>
                      <img
                        src={"http://localhost:3001" + jogadora.url_imagem}
                        alt={jogadora.nome}
                        className="rounded-full h-16 w-16 object-cover border-2 "
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

          {/* Lista lateral */}
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
                    {team[pos.key] ? "10.00" : "0.00"}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-600 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>PONTOS:</span>
                <span>
                  {positions.reduce(
                    (acc, pos) => acc + (team[pos.key] ? 10 : 0),
                    0
                  )}
                  .00
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TeamsPage;
