"use client";

import { useDocumentsContext } from "../context/DocumentsContext";
import { useRouter } from "next/navigation";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { documents } = useDocumentsContext();

  return (
    <>
      <List>
        {documents.map((doc) => (
          <ListItem key={doc.id}>
            <ListItemButton onClick={() => router.push(`/${doc.id}`)}>
              <ListItemText primary={doc.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
