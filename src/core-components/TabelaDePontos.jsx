import TRlinha from "../components/componentsRegras/TRlinha";


export default function TabelaDePontos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-green-700">
          Pontuação de Ataque
        </h3>
        <table className="w-full text-left text-gray-600">
          <thead>
            <TRlinha className="gray" children1="Ação" children2="Pontos" />
          </thead>
          <tbody>
            <TRlinha children1="Gol" children2="6,0 pts" />
            <TRlinha children1="Assistência" children2="3,0 pts" />
            <TRlinha children1="Falta sofrida" children2="0,5 pts" />
            <TRlinha children1="Pênalti sofrido" children2="1,0 pts" />
            <TRlinha children1="Hat-trick" children2="3,0 pts" />
            <TRlinha children1="Finalização" children2="0,5 pts" />
            <TRlinha
              className="red"
              children1="Pênalti perdido"
              children2="-4,0 pts"
            />
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-green-700">
          Pontuação de Defesa
        </h3>
        <table className="w-full text-left text-gray-600">
          <thead>
            <TRlinha className="gray" children1="Ação" children2="Pontos" />
          </thead>
          <tbody>
            <TRlinha children1="Defesa de Pênalti" children2="5,0 pts" />
            <TRlinha children1="Jogo sem sofrer gols" children2="4,0 pts" />
            <TRlinha children1="Defesa" children2="1,2 pts" />
            <TRlinha children1="Desarme" children2="0,5 pts" />
            <TRlinha
              className="red"
              children1="Gol contra"
              children2="-3,0 pts"
            />
            <TRlinha
              className="red"
              children1={"Cartão amarelo"}
              children2="-2,0 pts"
            />
            <TRlinha
              className="red"
              children1={"Cartão vermelho"}
              children2="-2,0 pts"
            />
            <TRlinha
              className="red"
              children1="Gol sofrido"
              children2="-1,0 pts"
            />
            <TRlinha
              className="red"
              children1="Pênalti cometido"
              children2="-1,0 pts"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
