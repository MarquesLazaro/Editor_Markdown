"use client";

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDocumentsContext } from "../../context/DocumentsContext";

export default function EditableLabel() {
  const { updateDocument, currentDocument } = useDocumentsContext();
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (currentDocument) {
      setTitle(currentDocument.title);
    }
  }, [currentDocument?.title]);

  const finish = () => {
    setEditing(false);
    updateDocument(currentDocument!.id, { title });
  };

  return (
    <TextField
      variant="standard"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onClick={() => setEditing(true)}
      onBlur={finish}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
      autoFocus={editing}
      sx={{
        width: "auto",
        "& .MuiInputBase-input": {
          textAlign: "center",
          cursor: editing ? "text" : "pointer",
          border: "none",
        },
        "& .MuiInput-underline:before": {
          borderBottom: editing ? undefined : "none",
        },
        "& .MuiInput-underline:after": {
          borderBottom: editing ? undefined : "none",
        },
      }}
    />
  );
}
