"use client";

import { useDocumentsContext } from "@/app/context/DocumentsContext";
import { useTheme } from "@mui/material";
import { RefObject, Dispatch, SetStateAction, useEffect } from "react";

interface EditorProps {
  ref: RefObject<HTMLTextAreaElement | null>;
}

const Editor = ({ ref }: EditorProps) => {
  const { currentDocumentId, content, setContent } = useDocumentsContext();
  const theme = useTheme();

  useEffect(() => {
    const textarea = ref.current;

    if (textarea) {
      const end = textarea.value.length;

      textarea.focus();
      textarea.setSelectionRange(end, end);
    }
  }, []);

  if (!currentDocumentId) return null;

  return (
    <textarea
      value={content}
      ref={ref}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Escreva aqui..."
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        resize: "none",
        outline: "none",
        fontFamily: "monospace",
        fontSize: "1rem",
        padding: "1rem",
        lineHeight: 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    />
  );
};

export default Editor;
