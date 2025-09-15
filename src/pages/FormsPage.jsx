import Container from "../components/componentsRegistro/ContainerRegistro";
import SectionRegistro from "../components/componentsRegistro/SectionRegistro";
import InputText from "../components/common/InputText";
import FormRegistro from "../components/componentsRegistro/FormRegistro";
import AdicionarJogadoras from "../core-components/AdicionarJogadoras";
import InputRadio from "../components/common/InputRadio";

export default function FormsPage() {
  return (
    <Container className="bg-purple-100">
      <SectionRegistro className="bg-fuchsia-800/50" />

        <FormRegistro adress="/cadastrese">      
          <div className="md:col-span-2">
            <label className="block text-gray-700">
              Você autoriza ser contatado(a) por marcas, clubes ou projetos
              ligados ao futebol feminino?
            </label>
            <div className="mt-2">
              <InputRadio>Sim</InputRadio>
              <InputRadio>Não</InputRadio>
            </div>
          </div>
          <InputText id="estado" className="registro">
            Estado que vive
          </InputText>
          <InputText id="cidade" className="registro">
            Cidade que vive
          </InputText>
        

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">DADOS DO TIME</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText id="time" className="registro">
              Nome do Time
            </InputText>
          </div>

          <AdicionarJogadoras />
        </div>


      </FormRegistro>
    </Container>
  );
}