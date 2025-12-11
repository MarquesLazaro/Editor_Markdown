"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ToolBar from "@/app/components/ToolBar/ToolBar";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DocumentEditorAndPreview from "@/app/components/EditorAndPreview/EditorAndPreview";
import { Box } from "@mui/material";

export default function ViewDocument() {
  const { id } = useParams<{ id: string }>();

  const { getOneDocument, setCurrentDocumentId, setContent } =
    useDocumentsContext();
  const document = getOneDocument(id);

  useEffect(() => {
    if (document) {
      setCurrentDocumentId(document.id);
      setContent(document.content);
    }
  }, [document]);

  if (!document) return null;

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
      <ToolBar />
      <DocumentEditorAndPreview />
    </Box>
  );
}
