import { createContext, useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState({
    GOL: null,
    DEF1: null,
    DEF2: null,
    MEI1: null,
    MEI2: null,
    ATA1: null,
    ATA2: null,
  });

  // Efeito para carregar os dados do usuário e do time ao iniciar
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const loadInitialData = async () => {
      // 1. Carrega dados do usuário do localStorage
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setTeamName(userData.teamName); // Atualiza o nome do time

        // 2. Busca a escalação salva no backend, APENAS se houver um email
        if (userData.email) {
          try {
            const response = await fetch(
              `${apiUrl}/escalacao/${userData.email}`
            );
            const data = await response.json();
            if (data.success && data.escalacao) {
              setTeam(data.escalacao); // Define o time com os dados do backend
            }
          } catch (error) {
            console.error("Falha ao carregar escalação salva:", error);
          }
        }
      }
    };

    loadInitialData();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Esta função permanece a mesma, mas será chamada manualmente
  const saveTeamToBackend = async (currentTeam) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    // Usamos o objeto completo do localStorage agora
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      console.error("Usuário não logado, não é possível salvar a escalação.");
      // Adicionamos um alerta de erro para o usuário
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Você precisa estar logado para salvar sua escalação!",
      });
      // Lançamos um erro para que a cadeia de `try/catch` possa capturá-lo
      throw new Error("Usuário não logado.");
    }

    const { email } = JSON.parse(userDataString);
    try {
      await fetch(`${apiUrl}/escalacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, team: currentTeam }),
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

  // NOVA FUNÇÃO: Será chamada pelo botão para salvar o time atual
  const saveTeam = async () => {
    await saveTeamToBackend(team);
  };

  return (
    <TeamContext.Provider
      // Adicionamos a nova função 'saveTeam' ao valor do contexto
      value={{
        team,
        teamName,
        setTeamName,
        escalarJogadora,
        clearTeam,
        saveTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
