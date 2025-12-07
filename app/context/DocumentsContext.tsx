"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CreateDocumentDTO,
  Document,
  UpdateDocumentDTO,
} from "../types/Document";

interface DocumentsProviderProps {
  children: React.ReactNode;
}

interface DocumentsContextProps {
  currentDocument: Document | null;
  content: string;
  documents: Document[];
  setContent: Dispatch<SetStateAction<string>>;
  setCurrentDocument: Dispatch<SetStateAction<Document | null>>;
  getDocuments: () => Document[];
  getOneDocument: (id: string) => Document | null;
  createDocument: (data: CreateDocumentDTO) => Document;
  deleteDocument: (id: string) => void;
  updateDocument: (id: string, data: UpdateDocumentDTO) => void;
}

export const DocumentsContext = createContext<DocumentsContextProps>({
  content: "",
  currentDocument: null,
  documents: [],
  setContent: () => null,
  setCurrentDocument: () => null,
  getDocuments: () => [],
  getOneDocument: (id: string) => null,
  createDocument: (data: CreateDocumentDTO) => Object(),
  deleteDocument: (id: string) => null,
  updateDocument: (id: string, data: UpdateDocumentDTO) => null,
});

const mockDocuments = [
  {
    id: "1707001000001",
    createdAt: "2025-02-05T12:00:00.000Z",
    updatedAt: "2025-02-05T12:00:00.000Z",
    title: "Introdução ao Projeto",
    content: "# Bem vindo ao editor\n\nEste é o primeiro documento de teste.",
  },
  {
    id: "1707001000002",
    createdAt: "2025-02-05T12:05:00.000Z",
    updatedAt: "2025-02-05T12:07:00.000Z",
    title: "Guia de Markdown",
    content: "## Títulos\n\n**Negrito**, *itálico*, `código`.",
  },
  {
    id: "1707001000003",
    createdAt: "2025-02-05T12:10:00.000Z",
    updatedAt: "2025-02-05T12:15:00.000Z",
    title: "Anotações Diversas",
    content: "- Item 1\n- Item 2\n- Item 3",
  },
  {
    id: "1707001000004",
    createdAt: "2025-02-05T12:20:00.000Z",
    updatedAt: "2025-02-05T12:25:00.000Z",
    title: "Checklist do Projeto",
    content:
      "- [x] Criar estrutura\n- [x] Implementar editor\n- [ ] Adicionar persistência",
  },
  {
    id: "1707001000005",
    createdAt: "2025-02-05T12:30:00.000Z",
    updatedAt: "2025-02-05T12:35:00.000Z",
    title: "Documentação Técnica",
    content: "```ts\nfunction exemplo() {\n  return true;\n}\n```",
  },
];

const DocumentsProvider = ({ children }: DocumentsProviderProps) => {
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [content, setContent] = useState<string>("");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);

  useEffect(() => {
    const local = localStorage.getItem("documents");

    if (local) {
      setDocuments(JSON.parse(local));
    }
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
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };

    setDocuments((prev) => [...prev, newDocument]);

    return newDocument;
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
    content,
    documents,
    currentDocument,
    setContent,
    setCurrentDocument,
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
