import React from "react";
import { createContext, useState } from "react";
const TrackContext = createContext();

function TrackProvider({ children }) {
  const [tracking, setTracking] = useState(false);
  const contextValue = {
    tracking,
    setTracking,
  };

  return (
    <TrackContext.Provider value={contextValue}>
      {children}
    </TrackContext.Provider>
  );
}

export { TrackProvider, TrackContext };
