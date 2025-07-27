"use client";

import { createContext, useContext, useState } from "react";

const GameAccessContext = createContext();

export function GameAccessProvider({ children }) {
  const [enterGame, setEnterGame] = useState(false);

  return (
    <GameAccessContext.Provider value={{ enterGame, setEnterGame }}>
      {children}
    </GameAccessContext.Provider>
  );
}

export function useGameAccess() {
  return useContext(GameAccessContext);
}
