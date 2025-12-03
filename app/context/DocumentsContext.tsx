import { createContext, useState } from "react";

interface DocumentsProviderProps {
  children: React.ReactNode;
}

interface DocumentsContextProps {}

export const DocumentsContext = createContext<DocumentsContextProps>({});

const DocumentsProvider = ({ children }: DocumentsProviderProps) => {
  const value = {};

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
};

export default DocumentsProvider;
