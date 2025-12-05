"use client";

import DocumentList from "../components/DocumentList/DocumentList";
import { useDocumentsContext } from "../context/DocumentsContext";

export default function Home() {
  const { documents } = useDocumentsContext();

  return (
    <>
      <DocumentList documents={documents} />
    </>
  );
}
