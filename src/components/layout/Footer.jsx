import { Link } from "react-router-dom";
import Logo from "../../assets/icons/logo-passa-a-bola.svg?react";
import LogoGitHub from "../../assets/icons/github-logo.svg?react";
import Icon from "../common/Icon";
import { FaYoutube, FaSpotify, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const developers = [
    { name: "Gabriel Akira", githubUrl: "https://github.com/Gakira06" },
    { name: "Ana Luiza", githubUrl: "https://github.com/Naluaqui" },
    { name: "Gustavo Santos", githubUrl: "https://github.com/gugasantos24" },
    { name: "Mauro Carlos", githubUrl: "https://github.com/Nogrog150" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Icon svg={Logo} alt="Logo Passa a Bola" className="w-10 h-10" />
              <span className="text-xl text-white">PASSA A BOLA</span>
            </div>
            <p className="text-sm">
              Promovendo a visibilidade e a paixão pelo futebol feminino através
              de um fantasy game inovador.
            </p>
          </div>

          <div>
            <h3 className="text-lg text-white mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="https://diariodofutebolfeminino.com.br/"
                  className="hover:text-purple-400 transition-colors"
                >
                  Destaques
                </Link>
              </li>
              <li>
                <Link
                  to="https://interativos.ge.globo.com/futebol/selecao-brasileira/especial/historia-do-futebol-feminino"
                  className="hover:text-purple-400 transition-colors"
                >
                  História
                </Link>
              </li>
              <li>
                <Link
                  to="/forms-game"
                  className="hover:text-purple-400 transition-colors"
                >
                  Criar Conta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-white mb-4">Contato e Mídia</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FaYoutube size={20} className="text-red-600" />
                <a
                  href="https://www.youtube.com/@passabola"
                  className="hover:text-purple-400 transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaSpotify size={20} className="text-green-500" />
                <a
                  href="https://open.spotify.com/show/18H1ysI9zyDIRahuCnZGQr?si=9feb46fb20514638"
                  className="hover:text-purple-400 transition-colors"
                >
                  Spotify
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope size={20} className="text-gray-400" />
                <a
                  href="mailto:passaabola@gmail.com"
                  className="hover:text-purple-400 transition-colors"
                >
                  passaabola@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-white mb-4">Desenvolvedores</h3>
            <ul className="space-y-3">
              {developers.map((dev) => (
                <li key={dev.name} className="flex items-center gap-3">
                  <a
                    href={dev.githubUrl}
                    aria-label={`GitHub de ${dev.name}`}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Icon svg={LogoGitHub} className="w-5 h-5" />
                  </a>
                  <span>{dev.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Passa a Bola. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
