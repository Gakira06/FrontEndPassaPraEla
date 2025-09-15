import { createContext, useState } from "react";

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState({
    GOL: null,
    DEF1: null,
    DEF2: null,
    MEI1: null,
    MEI2: null,
    ATA1: null,
    ATA2: null,
  });

  const escalarJogadora = (posicao, jogadora) => {
    setTeam((prev) => ({ ...prev, [posicao]: jogadora }));
  };

  return (
    <TeamContext.Provider value={{ team, escalarJogadora }}>
      {children}
    </TeamContext.Provider>
  );
};
