import React, { createContext, ReactNode, useContext, useState } from "react";
import { PoetryForm } from "utils/constants";

interface AppContextProps {
  selectedForm: PoetryForm;
  setSelectedForm: (form: PoetryForm) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedForm, setSelectedForm] = useState<PoetryForm>(
    PoetryForm.Haiku
  );

  return (
    <AppContext.Provider value={{ selectedForm, setSelectedForm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
