import { Document } from "@/app/types/Document";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";

const DocumentsList = ({ documents }: { documents: Document[] }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
      </Box>
    </>
  );
};

export default DocumentsList;
