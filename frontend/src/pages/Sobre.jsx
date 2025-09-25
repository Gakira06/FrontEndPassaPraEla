import HeaderUniversal from "../components/layout/HeaderUniversal";
import Footer from "../components/layout/Footer";
import AleLuana from "../assets/AleELuana.jpg";
import CopaPassaABola from "../assets/copinhaSobre.jpg";
import FundoSobre from "../assets/fundoSobre.png";
import ImagemAle from "../assets/aleXavier.jpg";
import ImagemLuana from "../assets/maluf.jpg";

const FounderBio = ({ name, image, alt, children, imageLeft = false }) => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div className={`order-2 ${imageLeft ? "md:order-2" : "md:order-1"}`}>
      <h3 className="text-3xl font-bold text-gray-800 mb-4">{name}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
    <div className={`order-1 ${imageLeft ? "md:order-1" : "md:order-2"}`}>
      <img
        src={image}
        alt={alt}
        className="rounded-lg shadow-xl w-full h-auto object-cover"
      />
    </div>
  </div>
);

export default function Sobre() {
  return (
    <div className="bg-gray-100 font-sans">
      <HeaderUniversal />

      {/* Seção Hero */}
      <section
        className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center"
        style={{ backgroundImage: `url(${FundoSobre})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center p-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Sobre o Passa a Bola
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Unindo paixão pelo futebol feminino e visão de negócio para
            transformar o cenário do esporte.
          </p>
        </div>
      </section>

      {/* Seção Principal */}
      <main className="max-w-7xl mx-auto py-16 px-6 md:px-10 space-y-20">
        {/* Missão e Visão */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nossa Missão
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Impulsionar o futebol feminino no Brasil, oferecendo uma plataforma
            que une entretenimento, engajamento e visibilidade. Acreditamos no
            poder do esporte como ferramenta de transformação social e
            empoderamento.
          </p>
        </section>

        {/* Fundadoras */}
        <section className="space-y-16">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              As Mentes por Trás do Jogo
            </h3>
          </div>
          <FounderBio name="Alê Xavier" image={ImagemAle} alt="Alê Xavier">
            Com o sonho de ser jogadora profissional, Alê direcionou sua paixão
            para o jornalismo esportivo. Após passagens marcantes pela Globo e
            pelo canal Desimpedidos, ela sentiu a necessidade de criar um espaço
            onde as mulheres pudessem falar de futebol de forma autêntica.
            Incomodada com o ambiente majoritariamente masculino e, por vezes,
            machista, Alê se uniu a Luana para fundar o Passa a Bola, um canal
            com o propósito de criar uma nova audiência e ser a referência que
            nunca tiveram.
          </FounderBio>
          <FounderBio
            name="Luana Maluf"
            image={ImagemLuana}
            alt="Luana Maluf"
            imageLeft
          >
            Luana herdou o amor pelo futebol de seu pai e trilhou seu próprio
            caminho na comunicação esportiva. Com experiência como colunista na
            ESPN, um canal próprio no YouTube chamado "1x0 Feminino", e a
            criação de um coletivo que reunia centenas de mulheres para jogar
            bola semanalmente, ela já era uma força no cenário do futebol
            feminino. Foi a visão de transformar esse coletivo em algo maior que
            a levou a procurar Alê, dando início à parceria que consolidaria o
            Passa a Bola como o maior canal sobre futebol feito por mulheres no
            Brasil.
          </FounderBio>
        </section>

        {/* Seção sobre a dupla */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Uma Dupla com Propósito
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>Alê Xavier</strong> e <strong>Luana Maluf</strong> são as
              idealizadoras e comandantes do Passa a Bola. A dupla transformou a
              paixão pelo futebol em uma empresa com propósito, criando um
              espaço autêntico e com perspectiva feminina no jornalismo
              esportivo.
            </p>
            <p className="text-gray-600">
              Mais do que apresentadoras, elas são ativistas da modalidade,
              utilizando sua plataforma para gerar debates importantes e
              promover a inclusão.
            </p>
          </div>
          <div className="order-1 md:order-2 ">
            <img
              src={AleLuana}
              alt="Alê Xavier e Luana Maluf"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* Projetos e Impacto */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={CopaPassaABola}
              alt="Copa Passa a Bola"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Além das Telas
            </h3>
            <p className="text-gray-600 mb-4">
              O Passa a Bola vai além do conteúdo digital. Através de
              iniciativas como a <strong>Copa Passa a Bola</strong>, um
              campeonato amador de futebol society, a empresa materializa sua
              missão de fortalecer a comunidade e criar oportunidades reais para
              mulheres no esporte.
            </p>
            <p className="text-gray-600">
              Esses eventos abrem portas para patrocínios, fortalecem a marca e,
              o mais importante, incentivam a prática esportiva e a paixão pelo
              futebol feminino.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
