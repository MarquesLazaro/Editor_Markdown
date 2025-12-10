"use client";

import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Document } from "@/app/types/Document";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { useDocumentsContext } from "@/app/context/DocumentsContext";

interface DocumentListItemProps {
  onOpen: () => void;
  document: Document;
}

const DocumentListItem = ({ document, onOpen }: DocumentListItemProps) => {
  const router = useRouter();
  const [title, setTittle] = useState<string>(document.title);
  const [edit, setEdit] = useState<boolean>(false);
  const { updateDocument } = useDocumentsContext();

  const handleViewDocument = () => router.push(`/document/${document.id}`);
  const handleOnBlur = () => {
    updateDocument(document.id, { title });
    setEdit(false);
  };
  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <ListItem key={document.id} disablePadding>
      <ListItemButton
        onClick={handleViewDocument}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {!edit ? (
          <ListItemText primary={document.title} sx={{ p: 0 }} />
        ) : (
          <TextField
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true,
              },
            }}
            value={title}
            onChange={(e) => setTittle(e.target.value)}
            autoFocus
            onBlur={handleOnBlur}
            onKeyDown={handleOnKeyDown}
          />
        )}

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setEdit(true);
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default DocumentListItem;
