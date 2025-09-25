import Container from "../components/componentsRegistro/ContainerRegistro";
import SectionRegistro from "../components/componentsRegistro/SectionRegistro";
import FormularioCompleto from "../components/componentsRegistro/FormularioCompleto"; // Importe o componente correto

export default function FormsPage() {
  return (
    <Container className="bg-purple-100">
      <SectionRegistro className="bg-fuchsia-800/50" />
      
      {/* Aqui usamos o FormularioCompleto, que contém toda a lógica para 
        cadastrar tanto o usuário quanto as jogadoras.
        A propriedade "adress" indica para qual página navegar após o sucesso.
      */}
      <FormularioCompleto adress="/cadastrese" />

    </Container>
  );
}