"use client";

import DocumentList from "../components/DocumentList/DocumentList";
import { useDocumentsContext } from "../context/DocumentsContext";

export default function Home() {
  const { getDocuments } = useDocumentsContext();
  const documents = getDocuments();

  return <DocumentList documents={documents} />;
}
