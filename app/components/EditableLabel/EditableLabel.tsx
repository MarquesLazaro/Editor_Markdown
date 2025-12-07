"use client";

import { TextField } from "@mui/material";
import { useState } from "react";
import { useDocumentsContext } from "../../context/DocumentsContext";

interface EditableLabelProps {
  label: string;
  id: string;
}

export default function EditableLabel({ label, id }: EditableLabelProps) {
  const { updateDocument } = useDocumentsContext();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(label);

  const finish = () => {
    setEditing(false);
    if (title !== label) updateDocument(id, { title });
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
