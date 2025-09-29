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

  // Esta função permanece a mesma, mas será chamada manualmente
  const saveTeamToBackend = async (currentTeam) => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
        console.error("Usuário não logado, não é possível salvar a escalação.");
        // Adicionamos um alerta de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Você precisa estar logado para salvar sua escalação!',
        });
        // Lançamos um erro para que a cadeia de `try/catch` possa capturá-lo
        throw new Error("Usuário não logado.");
    }

    try {
      await fetch("http://localhost:3001/escalacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, team: currentTeam }),
      });
    } catch (error) {
      console.error("Falha ao salvar escalação:", error);
      // Lança o erro para ser tratado na UI
      throw error;
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
        confirmButtonColor: "#8B5CF6",
      });
      return;
    }

    const newTeam = { ...team, [posicao]: jogadora };
    setTeam(newTeam);
    // REMOVIDO: Não salva mais no backend automaticamente
    // saveTeamToBackend(newTeam); 

    Swal.fire({
      icon: "success",
      title: "Boa!",
      text: `${jogadora.nome} foi escalada com sucesso na posição ${posicao}!`,
      timer: 2000,
      showConfirmButton: false,
    });
  };
  
  // Nenhuma mudança aqui, a limpeza continua salvando o time vazio no BD
  const clearTeam = () => {
    const emptyTeam = { GOL: null, DEF1: null, DEF2: null, MEI1: null, MEI2: null, ATA1: null, ATA2: null };
    setTeam(emptyTeam);
    saveTeamToBackend(emptyTeam);
  };
  
  // NOVA FUNÇÃO: Será chamada pelo botão para salvar o time atual
  const saveTeam = async () => {
    await saveTeamToBackend(team);
  };

  return (
    <TeamContext.Provider
      // Adicionamos a nova função 'saveTeam' ao valor do contexto
      value={{ team, teamName, setTeamName, escalarJogadora, clearTeam, saveTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);