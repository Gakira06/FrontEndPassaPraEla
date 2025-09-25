import { createContext, useState, useContext } from "react";
import Swal from "sweetalert2";

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamName, setTeamName] = useState("Meu Time");
  const [team, setTeam] = useState({
    GOL: null,
    DEF1: null,
    DEF2: null,
    MEI1: null,
    MEI2: null,
    ATA1: null,
    ATA2: null,
  });

  // Salva a escalação no backend
  const saveTeamToBackend = async (currentTeam) => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    try {
      await fetch("http://localhost:3001/escalacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, team: currentTeam }),
      });
    } catch (error) {
      console.error("Falha ao salvar escalação:", error);
    }
  };

  const escalarJogadora = (posicao, jogadora) => {
    const jogadoresAtuais = Object.values(team);
    const jaEscalada = jogadoresAtuais.some((p) => p && p.id === jogadora.id);

    if (jaEscalada) {
      Swal.fire({
        icon: "warning",
        title: "Jogadora já escalada",
        text: `${jogadora.nome} já faz parte do seu time.`,
        confirmButtonColor: "#8B5CF6", // Roxo
      });
      return;
    }

    const newTeam = { ...team, [posicao]: jogadora };
    setTeam(newTeam);
    saveTeamToBackend(newTeam);

    Swal.fire({
      icon: "success",
      title: "Boa!",
      text: `${jogadora.nome} foi escalada com sucesso na posição ${posicao}!`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Limpa a escalação
  const clearTeam = () => {
    const emptyTeam = {
      GOL: null,
      DEF1: null,
      DEF2: null,
      MEI1: null,
      MEI2: null,
      ATA1: null,
      ATA2: null,
    };
    setTeam(emptyTeam);
    saveTeamToBackend(emptyTeam);
  };

  return (
    <TeamContext.Provider
      value={{ team, teamName, setTeamName, escalarJogadora, clearTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
