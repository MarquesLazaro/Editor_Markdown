"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import ToolBar from "@/app/components/ToolBar/ToolBar";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DocumentEditorAndPreview from "@/app/components/DocumentEditorAndPreview/DocumentEditorAndPreview";
import { Document } from "@/app/types/Document";
import { Box } from "@mui/material";

export default function ViewDocument() {
  const { id } = useParams<{ id: string }>();

  const { getOneDocument, setCurrentDocument, setContent } =
    useDocumentsContext();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const document = getOneDocument(id);

    if (document) {
      setCurrentDocument(document);
      setContent(document.content);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <ToolBar ref={ref} />
      <DocumentEditorAndPreview ref={ref} />
    </Box>
  );
}
