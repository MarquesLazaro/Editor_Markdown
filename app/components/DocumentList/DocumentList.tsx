"use client";

import { useRouter } from "next/navigation";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import { Document } from "@/app/types/Document";

interface DocumentListProps {
  documents: Document[];
}

const DocumentList = ({ documents }: DocumentListProps) => {
  const router = useRouter();

  return (
    <List>
      {documents.map((doc) => (
        <ListItem key={doc.id}>
          <ListItemButton onClick={() => router.push(`/${doc.id}`)}>
            <ListItemText primary={doc.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DocumentList;
