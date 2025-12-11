"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ToolBar from "@/app/components/ToolBar/ToolBar";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DocumentEditorAndPreview from "@/app/components/EditorAndPreview/EditorAndPreview";
import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";

export default function ViewDocument() {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

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

      {/* <AppBar
        position="fixed"
        sx={{
          height: "sm",
          bottom: 0,
          top: "auto",
          backgroundColor: theme.palette.primary.main,
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ color: theme.palette.text.primary }}>
          <Typography variant="body2" sx={{ flexGrow: 1, textAlign: "center" }}>
            &copy; 2025 Meu Projeto - Todos os direitos reservados.
          </Typography>
        </Toolbar>
      </AppBar> */}
    </Box>
  );
}
