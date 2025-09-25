import CamisetaPrincipal from "../assets/capaRoupa.png";
import HeaderLoja from "../components/layout/HeaderLoja";
import CardLoja from "../components/common/CardLoja.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function Loja() {
  return (
    <div>
      <HeaderLoja />
      <div className="bg-[linear-gradient(to_right,#3b0764,#c71585)]">
        <div
          className="bg-cover bg-center bg-no-repeat h-[90vh] grid grid-cols-2"
          style={{
            backgroundImage: `url(${CamisetaPrincipal})`,
          }}
        >
          <div></div>
          <div className="flex flex-col justify-center text-center items-center">
            <h1 className="text-white text-8xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
              Passa a Bola
            </h1>
            <p className="text-3xl text-4">
              Estilo de jogo, dentro e fora das quatro linhas.
            </p>
          </div>
        </div>
      </div>
      <div className="m-8">
        <h2 className="ml-12 text-4xl ">Destaques</h2>
        <CardLoja />
      </div>
      <Footer />
    </div>
  );
}
