import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputText from "../common/InputText";
import { useTeam } from "../../context/useTeam"; // Importa o hook do contexto
import Swal from "sweetalert2";
import AdicionarJogadoras from "../../core-components/AdicionarJogadoras"; // Importando o componente de jogadoras

export default function FormularioCompleto({ adress }) {
  const navigate = useNavigate();
  const { setTeamName } = useTeam(); // Pega a função para definir o nome do time
  // Estado para os dados do usuário
  const [user, setUser] = useState({ email: "", senha: "", nomeDaEquipe: "" });
  // Estado para a lista de jogadoras
  const [jogadoras, setJogadoras] = useState([
    { nome: "", posicao: "", numero_camisa: "", imagem: null },
  ]);

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Finalizando Cadastro...",
      text: "Estamos salvando seus dados e das jogadoras. Isso pode levar um momento.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // --- Etapa 1: Cadastrar Usuário ---
      // Salva o nome do time no contexto global
      if (user.nomeDaEquipe.trim()) {
        setTeamName(user.nomeDaEquipe);
      }

      const userResponse = await fetch("http://localhost:3001/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          senha: user.senha,
          nomeDaEquipe: user.nomeDaEquipe,
        }),
      });
      const userData = await userResponse.json();
      if (!userResponse.ok) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Erro no Cadastro",
          text: `Não foi possível cadastrar o usuário: ${userData.message}`,
          confirmButtonColor: "#8B5CF6",
        });
        return;
      }

      // O alerta de carregamento continua, pois agora vamos para a etapa 2

      // --- Etapa 2: Preparar e Enviar Dados das Jogadoras ---
      const formData = new FormData();
      jogadoras.forEach((jogadora) => {
        formData.append("nome", jogadora.nome);
        formData.append("posicao", jogadora.posicao);
        formData.append("numero_camisa", jogadora.numero_camisa);
        formData.append("nome_time", user.nomeDaEquipe); // Adiciona o nome do time para cada jogadora
        formData.append("imagens", jogadora.imagem); // **IMPORTANTE**: O 'name' é 'imagens'
      });

      const playerResponse = await fetch("http://localhost:3001/jogadoras", {
        method: "POST",
        body: formData,
      });

      const playerData = await playerResponse.json();

      if (playerResponse.ok) {
        Swal.close();
        await Swal.fire({
          icon: "success",
          title: "Tudo Certo!",
          text: playerData.message,
          confirmButtonColor: "#22C55E", // Verde
        });
        navigate(adress);
      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Erro ao Cadastrar Jogadoras",
          text: playerData.message,
        });
      }
    } catch (error) {
      console.error("Erro no processo de cadastro:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Erro de Conexão",
        text: "Falha na comunicação com o servidor. Verifique o console para mais detalhes.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">DADOS DO RESPONSÁVEL</h2>
        <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
          <InputText
            name="email"
            type="email"
            value={user.email}
            onChange={handleUserChange}
            className="registro"
          >
            Email para Login
          </InputText>
          <InputText
            name="nomeDaEquipe"
            value={user.nomeDaEquipe}
            onChange={handleUserChange}
            className="registro"
          >
            Nome da Equipe
          </InputText>
          <InputText
            name="senha"
            type="password"
            value={user.senha}
            onChange={handleUserChange}
            className="registro"
          >
            Senha
          </InputText>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">DADOS DAS JOGADORAS</h2>
        <AdicionarJogadoras jogadoras={jogadoras} setJogadoras={setJogadoras} />
      </div>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-purple-600 text-white px-20 py-3 rounded-md hover:bg-purple-700 mt-5"
        >
          Finalizar Cadastro
        </button>
      </div>
    </form>
  );
}
