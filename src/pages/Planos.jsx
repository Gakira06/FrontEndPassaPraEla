import Button from "../components/common/Button";
import HeaderUniversal from "../components/layout/HeaderUniversal";
import { Link } from "react-router-dom";

// Um pequeno componente auxiliar para os itens da lista de benefícios
const BeneficioItem = ({ children, incluso }) => (
  <li className="flex items-center space-x-3">
    <span className={`text-2xl ${incluso ? "text-green-500" : "text-red-500"}`}>
      {incluso ? "✓" : "✗"}
    </span>
    <span className="text-gray-300">{children}</span>
  </li>
);

export default function Planos() {
  return (
    <>
      <HeaderUniversal />
      <main className="bg-gray-900 py-16 px-4 font-sans min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white tracking-tight">
            Escolha o plano ideal para você
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Jogue de graça ou vire Premium para ter a experiência completa e
            apoiar o futebol feminino!
          </p>
        </div>

        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card do Plano Gratuito */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 flex flex-col">
            <h3 className="text-3xl font-bold text-white">Plano Gratuito</h3>
            <p className="mt-4 text-5xl font-extrabold text-white">Grátis</p>
            <p className="mt-2 text-gray-400">Para sempre</p>

            <ul className="mt-8 space-y-4 text-left">
              <BeneficioItem incluso={true}>Acesso ao jogo</BeneficioItem>
              <BeneficioItem incluso={true}>
                Acesso ao portal de notícias
              </BeneficioItem>
              <BeneficioItem incluso={false}>Com anúncios</BeneficioItem>
              <BeneficioItem incluso={false}>
                Estatísticas para escalação
              </BeneficioItem>
            </ul>

            <div className="mt-auto pt-8">
              <Link to="/regras">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors">
                  Comece Agora
                </button>
              </Link>
            </div>
          </div>

          {/* Card do Plano Premium */}
          <div className="bg-purple-900/50 border-purple-500 rounded-2xl p-8 flex flex-col ring-purple-600 shadow-2xl shadow-purple-500/20">
            <h3 className="text-3xl font-bold text-white">Plano Premium</h3>
            <p className="mt-4 text-5xl font-extrabold text-white">
              12x R$ 4,99
            </p>
            <p className="mt-2 text-gray-400">Total de R$ 59,90 por ano</p>

            <ul className="mt-8 space-y-4 text-left">
              <BeneficioItem incluso={true}>Acesso ao jogo</BeneficioItem>
              <BeneficioItem incluso={true}>
                Acesso ao portal de notícias
              </BeneficioItem>
              <BeneficioItem incluso={true}>Sem anúncios</BeneficioItem>
              <BeneficioItem incluso={true}>
                Estatísticas que te ajudam na escalação
              </BeneficioItem>
            </ul>

            <div className="mt-auto pt-8">
              <Button className="w-full text-lg">Assinar Premium</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
