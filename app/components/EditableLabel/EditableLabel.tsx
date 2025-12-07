"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDocumentsContext } from "@/app/context/DocumentsContext";

interface EditableLabelProps {
  id: string;
  label: string;
}

const EditableLabel = ({ label, id }: EditableLabelProps) => {
  const { updateDocument } = useDocumentsContext();
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(label);

  const handleClick = () => {
    setEditing(true);
  };

  const disableEditing = () => {
    setEditing(false);
    updateDocument(id, { title });
  };

  return (
    <Box >
      {editing ? (
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={disableEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter") disableEditing();
          }}
          size="small"
          autoFocus
        />
      ) : (
        <Typography onClick={handleClick}>{title}</Typography>
      )}
    </Box>
  );
};

export default EditableLabel;
