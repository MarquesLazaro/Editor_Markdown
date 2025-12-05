"use client";

import DocumentList from "../components/DocumentList/DocumentList";
import { useDocumentsContext } from "../context/DocumentsContext";
import { Button } from "@mui/material";

export default function Home() {
  const { documents } = useDocumentsContext();

  return (
    <>
      <DocumentList documents={documents} />
    </>
  );
}
