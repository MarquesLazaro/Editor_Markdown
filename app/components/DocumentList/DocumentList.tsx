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
  Divider,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

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
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "70%",
          borderRadius: theme.shape.borderRadius,
          p: 3,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              ml: 2,
              color: theme.palette.text.primary,
              fontSize: "bold",
            }}
          >
            Seus Documentos
          </Typography>
          <Button
            onClick={onClick}
            sx={{
              backgroundColor: theme.palette.primary.main,
              margin: "1rem",
              color: "white",
              width: "10rem",
              borderRadius: "0.5rem",

              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            Novo Documento
          </Button>
        </Box>

        <Divider />
        <List>
          {documents.map((doc) => (
            <ListItem
              key={doc.id}
              secondaryAction={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    edge="end"
                    onClick={() => console.log("edit", doc.id)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    edge="end"
                    onClick={() => console.log("delete", doc.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemButton onClick={() => router.push(`/${doc.id}`)}>
                <ListItemText primary={doc.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DocumentsList;
