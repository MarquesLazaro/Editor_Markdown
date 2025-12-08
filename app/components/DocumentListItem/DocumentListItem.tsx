"use client";

import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Document } from "@/app/types/Document";
import { useRouter } from "next/navigation";

interface DocumentListItemProps {
  onOpen: () => void;
  document: Document;
}

const DocumentListItem = ({ document, onOpen }: DocumentListItemProps) => {
  const router = useRouter();

  return (
    <ListItem key={document.id} disablePadding>
      <ListItemButton
        onClick={() => router.push(`/${document.id}`)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ListItemText primary={document.title} />

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
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
