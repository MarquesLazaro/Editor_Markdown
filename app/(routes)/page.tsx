"use client";

import { useDocumentsContext } from "../context/DocumentsContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ListItemButton } from "@mui/material";

export default function Home() {
  const { documents } = useDocumentsContext();

  return (
    <>
      <List>
        {documents.map((doc) => (
          <ListItem key={doc.id}>
            <InsertDriveFileIcon sx={{ mr: 1 }} />
            <ListItemButton>
              <ListItemText primary={doc.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
