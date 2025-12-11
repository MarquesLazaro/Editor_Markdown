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
import { mockDocuments } from "../mocks/Documents";
import { SaveStatus } from "../types/SaveStatus";

interface DocumentsProviderProps {
  children: React.ReactNode;
}

interface DocumentsContextProps {
  currentDocumentId: string;
  content: string;
  saveStatus: SaveStatus;
  setSaveStatus: Dispatch<SetStateAction<SaveStatus>>;
  undo: () => void;
  setContent: Dispatch<SetStateAction<string>>;
  setCurrentDocumentId: Dispatch<SetStateAction<string>>;
  getDocuments: () => Document[];
  getOneDocument: (id: string) => Document | null;
  createDocument: (data: CreateDocumentDTO) => Document;
  deleteDocument: (id: string) => void;
  updateDocument: (id: string, data: UpdateDocumentDTO) => void;
}

export const DocumentsContext = createContext<DocumentsContextProps>({
  content: "",
  currentDocumentId: "",
  saveStatus: SaveStatus.SAVE,
  setSaveStatus: () => null,
  undo: () => {},
  setContent: () => null,
  setCurrentDocumentId: () => null,
  getDocuments: () => [],
  getOneDocument: (id: string) => null,
  createDocument: (data: CreateDocumentDTO) => Object(),
  deleteDocument: (id: string) => null,
  updateDocument: (id: string, data: UpdateDocumentDTO) => null,
});

const DocumentsProvider = ({ children }: DocumentsProviderProps) => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentDocumentId, setCurrentDocumentId] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SaveStatus.SAVE);

  useEffect(() => {
    const local = localStorage.getItem("documents");

    if (local) {
      setDocuments(JSON.parse(local));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateDocument(currentDocumentId, { content });
      setSaveStatus(SaveStatus.SAVE);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

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
        if (doc.id === id)
          return { ...doc, ...data, updatedAt: new Date().toISOString() };
        return doc;
      })
    );

    setHistory((prevHistory) => [...prevHistory, content]);
  };

  const undo = () => {
    if (history.length === 0) return;

    const lastContent = history[history.length - 1];
    setContent((prev) => lastContent ?? prev);
    setHistory([...history.slice(0, -1)]);
  };

  const value: DocumentsContextProps = {
    content,
    currentDocumentId,
    saveStatus,
    setSaveStatus,
    undo,
    setContent,
    setCurrentDocumentId,
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
