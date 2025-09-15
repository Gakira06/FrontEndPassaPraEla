import CapaCadastrese from "../assets/capaCadastrese.png";
import LogoPassaABolaBlack from "../assets/logo-passa-a-bola-black.png";
import { NavLink } from "react-router-dom"; 
import FormsLogin from "../core-components/FormsLogin";

export default function Cadastrese() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      

      <img
        src={CapaCadastrese}
        alt="imagem das donas do passa a bola"
        className="hidden lg:block h-full w-full object-cover"
      />

      <div className="flex flex-col justify-center items-center p-8 text-black w-full">
        <div className="w-full max-w-md">
          <div className="relative mb-8 flex items-center justify-center">
            <img
              src={LogoPassaABolaBlack}
              alt="Logo Passa a Bola"
              className="w-14 h-14" 
            />
            <h1 className="text-4xl ml-4">Passa Pra Ela</h1>
          </div>

          <div className="flex items-center justify-center mb-4">
            <h2 className="text-3xl">Login</h2>
          </div>

          <FormsLogin />

          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-4 text-center sm:text-left justify-center">
            <p>Não tem uma conta?</p>
            <NavLink to="/forms-game">
              <span className="text-blue-700 cursor-pointer font-semibold">
                Crie sua conta
              </span>
            </NavLink>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 text-center sm:text-left justify-center">
            <p>Quer cadastrar sua Equipe?</p>
            <NavLink to="/forms">
              <span className="text-blue-700 cursor-pointer font-semibold">
                Cadastre sua Equipe
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}