import Button from "../components/common/Button";
import { NavLink } from 'react-router-dom';

export default function TituloPrincipal() {
  return (
    <div className="relative w-full min-h-[70vh] flex flex-col justify-center items-center text-center p-4 z-10 
                   md:items-start md:text-left md:w-1/2 md:p-10 lg:p-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
        PASSA PRA ELA
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-white mt-4 mb-8 max-w-md">
        Faça a sua conta agora e entre para o time
      </p>
      <NavLink to='/forms-game'>
        <Button className="px-8 py-3 text-lg sm:text-xl font-semibold">
          Criar conta
        </Button>
      </NavLink>
    </div>
  );
}