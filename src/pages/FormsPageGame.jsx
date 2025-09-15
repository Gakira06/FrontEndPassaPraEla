import Container from "../components/componentsRegistro/ContainerRegistro";
import SectionRegistro from "../components/componentsRegistro/SectionRegistro";
import InputText from "../components/common/InputText";
import FormRegistro from "../components/componentsRegistro/FormRegistro";
import Termos from "../core-components/Termos";

export default function FormsPageGame() {
  return (
    <Container className="bg-green-100">
      <SectionRegistro className="bg-green-600" />  
        <FormRegistro adress='/regras'>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">DADOS DO TIME</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText id="nomeDaEquipe" className="registro">
              Qual será o nome da sua equipe?
            </InputText>
          </div>
        </div>


        <Termos />

      </FormRegistro>
    </Container>
  );
}
