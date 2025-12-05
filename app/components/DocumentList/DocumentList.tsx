import { useDocumentsContext } from "@/app/context/DocumentsContext";
import { Document } from "@/app/types/Document";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface DocumentListProps {
  documents: Document[];
}

const DocumentsList = ({ documents }: DocumentListProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { createDocument } = useDocumentsContext();

  const onClick = () => {
    const { id } = createDocument({
      title: "Novo Documento",
      content: "",
    });

    router.push(`/${id}`);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[3],
            p: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              textAlign: "center",
              color: theme.palette.text.primary,
              fontSize: "bold",
            }}
          >
            Seus Documentos
          </Typography>

          {documents.map((doc) => (
            <ListItem key={doc.id} disablePadding>
              <ListItemButton
                onClick={() => router.push(`/${doc.id}`)}
                sx={{
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText primary={doc.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Button
          onClick={onClick}
          sx={{
            backgroundColor: "blue",
            margin: "1rem",
            color: "white",
            width: "100%",
            maxWidth: 400,
            borderRadius: "3rem",

            "&:hover": {
              backgroundColor: "grey",
            },
          }}
        >
          Novo Documento
        </Button>
      </Box>
    </>
  );
};

export default DocumentsList;
