import React, { createContext, useContext, useState } from "react";

type ContextValues = {
  sourceState: any;
  setSourceState: (sourceState: any) => void;
  sourceConfig: any;
  setSourceConfig: (sourceConfig: any) => void;
};

const defaultValueContext: ContextValues = {
  sourceState: {
    nodes: [],
    edges: [],
  },
  setSourceState: () => {},
  sourceConfig: undefined,
  setSourceConfig: () => {},
};

const AppContext = createContext<ContextValues>(defaultValueContext);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [sourceState, setSourceState] = useState(
    defaultValueContext.sourceState
  );
  const [sourceConfig, setSourceConfig] = useState(
    defaultValueContext.sourceConfig
  );

  const contextValues = {
    sourceState,
    setSourceState,
    sourceConfig,
    setSourceConfig,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppProvider };
