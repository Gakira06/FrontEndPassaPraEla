import Container from "../components/componentsRegistro/ContainerRegistro";
import SectionRegistro from "../components/componentsRegistro/SectionRegistro";
import FormRegistro from "../components/componentsRegistro/FormRegistro";
import Termos from "../core-components/Termos";

export default function FormsPageGame() {
  return (
    <Container className="bg-green-100">
      <SectionRegistro className="bg-green-600" />  
        <FormRegistro adress='/planos'>

        


          <Termos />

        </FormRegistro>
    </Container>
  );
}
