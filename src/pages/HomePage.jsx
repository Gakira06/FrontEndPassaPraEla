import ImagemDeFundo1 from "../assets/imagemDeFundo.png";
import QuadradoRoxo from "../core-components/QuadradoRoxo";
import TituloPrincipal from "../core-components/TituloPrincipal";
import Historia from "../components/sections/Historia";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Canais from "../components/sections/Canais";
import ApiNoticia from "../components/api/ApiNoticia"
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section
        style={{
          backgroundImage: `url(${ImagemDeFundo1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <QuadradoRoxo />
        <Header />
        <TituloPrincipal />
      </section>
      <section className="bg-gray-100">
        <div className="max-w-6xl mx-auto py-12 px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Análise de Desempenho e Engajamento
            </h2>
            <p className="text-lg text-gray-600 mb-6">
                Veja a simulação de como o desempenho físico da jogadora se traduz em engajamento digital, usando os modelos de Cálculo e Estatística.
            </p>
            <NavLink to="/math-analytics">
                <button 
                    className="bg-purple-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                >
                    Ver Análise Matemática
                </button>
            </NavLink>
        </div>
        <div className="max-w-6xl mx-auto flex max-lg:flex-col justify-center gap-8 mb-20">
          <ApiNoticia />
        </div>
        <Historia />
        <Canais />
      </section>
      <Footer />
    </div>
  );
}
