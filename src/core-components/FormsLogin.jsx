import { useState } from "react";
import ButtonForms from "../components/common/ButtonForms";
import InputChecked from "../components/common/InputChecked";
import InputText from "../components/common/InputText";
import { useNavigate } from "react-router-dom";

export default function FormsLogin() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // 1. Pega a URL da API das variáveis de ambiente <-- MUDANÇA AQUI
  const apiUrl = import.meta.env.VITE_API_URL;

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
    try {
      // 2. Usa a variável apiUrl para montar a URL completa <-- MUDANÇA AQUI
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/team");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Falha na comunicação com o servidor.");
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