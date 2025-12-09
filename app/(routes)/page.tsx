"use client";

import { useEffect, useState } from "react";
import DocumentList from "../components/DocumentList/DocumentList";
import { useDocumentsContext } from "../context/DocumentsContext";
import { Button } from "@mui/material";
import { Document } from "../types/Document";

export default function Home() {
  const { getDocuments } = useDocumentsContext();
  const [documents, setDocuments] = useState<Document[] | null>(null);

  useEffect(() => {
    const docs = getDocuments();

    setDocuments(docs);
  }, []);

  if (!documents) return null;

  return (
    <>
      <DocumentList documents={documents} />
    </>
  );
}
