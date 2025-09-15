import { useState } from "react";
import { Link } from "react-router-dom";
import LogoPassaABola from "../../assets/icons/logo-passa-a-bola.svg";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "https://diariodofutebolfeminino.com.br/", text: "Destaques" },
    { href: "https://interativos.ge.globo.com/futebol/selecao-brasileira/especial/historia-do-futebol-feminino", text: "História" },
    { href: "/cadastrese", text: "Login" },
  ];

  return (
    <header className="py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-50 text-white bg-gradient-to-b from-[rgba(38,0,50,0.85)] to-[rgba(17,0,50,0.85)] backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-3">
        <img
          src={LogoPassaABola}
          alt="Logo Passa a Bola"
          className="w-10 h-10 block"
        />
        <span className="font-bold text-[28px] hidden sm:block">
          Passa a Bola
        </span>
      </Link>
      
      <nav
        className={`
          fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg
          flex flex-col justify-center items-center gap-8
          transition-transform duration-300 ease-in-out z-40
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:flex-row md:h-auto md:w-auto md:bg-transparent md:translate-x-0 md:backdrop-blur-none
        `}
      >
        {navLinks.map((link) => (
          <Link
            key={link.text}
            to={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-400 text-2xl md:text-[22px] transition-colors"
          >
            {link.text}
          </Link>
        ))}
        <Link
          to="/forms-game"
          onClick={() => setIsMenuOpen(false)}
          className="bg-purple-600 px-6 py-2 rounded-full font-semibold text-lg md:text-[18px] hover:bg-purple-700 transition-colors"
        >
          Criar conta
        </Link>
      </nav>

      <button
        className="md:hidden z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menu"
      >
        {isMenuOpen ? <HiOutlineX size={30} /> : <HiOutlineMenuAlt3 size={30} />}
      </button>
    </header>
  );
}