"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const EditableLabel = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("Sem nome");

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const disableEditing = () => {
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={disableEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter") disableEditing();
          }}
          size="small"
          autoFocus
        />
      ) : (
        <Typography onDoubleClick={handleDoubleClick}>{value}</Typography>
      )}
    </>
  );
};

export default EditableLabel;
