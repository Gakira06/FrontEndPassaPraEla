// src/components/sections/Historia.jsx
import PrimeiraEquipe from "../../assets/historia.png";
import { NavLink } from 'react-router-dom';

export default function Historia() {
  return (
    <section className="ml-20 mr-20 bg-gradient-to-r from-[rgba(30,0,101,0.90)] to-[rgba(115,0,139,0.90)] text-white py-12 px-6 md:px-10">
      <div className="flex flex-col max-w-6xl mx-auto">
        <h2 className="bg-6 p-4 text-5xl font-bold text-center mb-8">
          HISTÓRIA DO FUTEBOL FEMININO
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Esquerdo */}
          <article className="bg-6 p-6 rounded-lg flex flex-col gap-2 hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl mb-3">
              PRIMEIRAS EQUIPES DE FUTEBOL FEMININO NO BRASIL
            </h3>
            <img
              src={PrimeiraEquipe}
              alt="Primeira equipe de futebol feminino no Brasil"
            />
            <p className="text-gray-300">
              Em 1983, o Esporte Clube Radar, do Rio de Janeiro, criou um dos
              primeiros times femininos do país. O time dominou o cenário
              nacional durante a década, vencendo os torneios seguintes. Entre
              1983 e 1988, o Radar garantiu o hexacampeonato do Campeonato
              Carioca e se tornou a base da Seleção Brasileira.
            </p>
          </article>
          {/* Card Direito */}
          <div className="flex flex-col justify-between">
            <article className="bg-6 p-6 rounded-lg hover:shadow-lg hover:scale-105 mb-2 transition-transform duration-300">
              <h3 className="text-xl mb-3">BRASILEIRÃO FEMININO NEOENERGIA</h3>

              <p className="text-gray-300">
                O Campeonato Brasileiro de Futebol Feminino de 2024
                (Confederação Brasileira de Futebol) com a participação dos 20
                melhores clubes do Brasil. A competição é dividida em três
                categorias, Séries A1, A2 e A3. A série A1 é a elite da
                competição da categoria, formada por 16 clubes e uma série A2,
                também com 16 times.
              </p>
            </article>
            <article className="bg-6 p-4 flex flex-col gap-2 items-center text-center justify-center pb-10 rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <p className="text-gray-300">
                As sedes da Copa do Mundo se revezaram entre países da América
                do Norte, Europa e Ásia. Os Estados Unidos abrigaram a
                competição por duas vezes (1999 e 2013) e o Canadá uma (2015).
              </p>
              <div className="flex items-center justify-center text-center ">
                <NavLink to="https://interativos.ge.globo.com/futebol/selecao-brasileira/especial/historia-do-futebol-feminino">
                  <button className="hover:bg-violet-700 transition-colors duration-200 cursor-pointer p-2 pl-8 pr-8 bg-7 text-[1.5rem] rounded-lg">
                    Leia mais
                  </button>
                </NavLink>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
