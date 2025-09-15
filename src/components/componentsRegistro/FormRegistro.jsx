import { useState } from "react";
import InputText from "../common/InputText";
import { useNavigate } from "react-router-dom";

export default function FormRegistro({ children, adress }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    data: "",
    cpf: "",
    senha: "",
  });
  const navigate = useNavigate();

  // 1. Pega a URL da API das variáveis de ambiente <-- MUDANÇA AQUI
  const apiUrl = import.meta.env.VITE_API_URL;

  // Função para atualizar o estado quando o usuário digita
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    try {
      // 2. Usa a variável apiUrl para montar a URL completa <-- MUDANÇA AQUI
      const response = await fetch(`${apiUrl}/cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const data = await response.json();
      alert(data.message); // Exibe uma mensagem de sucesso ou erro do backend
      // Navega para a próxima página apenas se a requisição foi bem-sucedida (ex: status 201 Created)
      if (response.ok) {
        navigate(adress);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Falha na comunicação com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputText
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="registro"
        >
          Nome Completo
        </InputText>
        <InputText
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="registro"
        >
          Email para contato
        </InputText>
        <InputText
          id="telefone"
          type="tel"
          value={formData.telefone}
          onChange={handleChange}
          className="registro"
        >
          Número de telefone
        </InputText>
        <InputText
          id="data"
          type="date"
          value={formData.data}
          onChange={handleChange}
          className="registro"
        >
          Data de Nacimento
        </InputText>
        <InputText
          id="cpf"
          value={formData.cpf}
          onChange={handleChange}
          className="registro"
        >
          CPF
        </InputText>
        <InputText
          id="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
          className="registro"
        >
          Senha
        </InputText>
      </div>
      {children}
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-purple-600 text-white px-20 py-3 rounded-md hover:bg-purple-700 mt-5"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}