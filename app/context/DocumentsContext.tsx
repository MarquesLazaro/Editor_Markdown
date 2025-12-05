import { createContext, useContext, useEffect, useState } from "react";
import {
  CreateDocumentDTO,
  Document,
  UpdateDocumentDTO,
} from "../types/Document";

interface DocumentsProviderProps {
  children: React.ReactNode;
}

interface DocumentsContextProps {
  documents: Document[];
  getDocuments: () => Document[];
  getOneDocument: (id: string) => Document | null;
  createDocument: (data: CreateDocumentDTO) => void;
  deleteDocument: (id: string) => void;
  updateDocument: (id: string, data: UpdateDocumentDTO) => void;
}

export const DocumentsContext = createContext<DocumentsContextProps | null>(
  null
);

const DocumentsProvider = ({ children }: DocumentsProviderProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const localDocuments = localStorage.getItem("documents");

    if (localDocuments) setDocuments(JSON.parse(localDocuments));
  }, []);

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const getDocuments = () => {
    return documents;
  };

  const getOneDocument = (id: string) => {
    return documents.find((document) => document.id === id) ?? null;
  };

  const createDocument = (data: CreateDocumentDTO) => {
    const newDocument: Document = {
      id: documents.length.toString(),
      createdAt: "",
      updatedAt: "",
      ...data,
    };

    setDocuments((prev) => [...prev, newDocument]);
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const updateDocument = (id: string, data: UpdateDocumentDTO) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id == id) return { ...doc, ...data };
        return doc;
      })
    );
  };

  const value = {
    documents,
    getDocuments,
    getOneDocument,
    createDocument,
    deleteDocument,
    updateDocument,
  };

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocumentsContext = () => {
  const documentsContext = useContext(DocumentsContext);

  return documentsContext;
};

export default DocumentsProvider;
