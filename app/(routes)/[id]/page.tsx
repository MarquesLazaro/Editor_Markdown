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

  const [content, setContent] = useState<string>("");
  const { getOneDocument, setCurrentDocument } = useDocumentsContext();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const document = getOneDocument(id);

    if (document) {
      setCurrentDocument(document);
      setContent(document.content);
    }
  }, [id, getOneDocument]);

  if (!document) return;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <ToolBar ref={ref} content={content} setContent={setContent} />
      <DocumentEditorAndPreview
        ref={ref}
        content={content}
        setContent={setContent}
      />
    </Box>
  );
}
