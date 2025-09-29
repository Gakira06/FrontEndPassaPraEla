import { useState } from "react";
import ButtonForms from "../components/common/ButtonForms";
import InputChecked from "../components/common/InputChecked";
import InputText from "../components/common/InputText";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../context/useTeam";
import Swal from "sweetalert2";

export default function FormsLogin() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const { setTeamName } = useTeam();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Verificando...",
      text: "Aguarde enquanto validamos suas credenciais.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.close(); // Fecha o alerta de carregamento antes de mostrar o de sucesso
        Swal.fire({
          icon: "success",
          title: "Login bem-sucedido!",
          text: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        // Salva o email do usuário no localStorage
        localStorage.setItem("userEmail", formData.email);

        if (data.teamName) {
          setTeamName(data.teamName);
        }
        navigate(data.redirectTo || "/team");
      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Falha no Login",
          text: data.message,
          confirmButtonColor: "#8B5CF6",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Erro de Conexão",
        text: "Não foi possível se comunicar com o servidor. Tente novamente mais tarde.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      >
        Email
      </InputText>
      <InputText
        id="senha"
        type="password"
        value={formData.senha}
        onChange={(e) => handleChange("senha", e.target.value)}
      >
        Senha
      </InputText>
      <InputChecked checked={rememberMe} onChange={handleCheckboxChange}>
        Lembre de mim
      </InputChecked>
      <div className="flex justify-center">
        <ButtonForms type="submit">Login</ButtonForms>
      </div>
    </form>
  );
}
