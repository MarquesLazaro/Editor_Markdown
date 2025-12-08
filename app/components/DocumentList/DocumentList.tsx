import { useDocumentsContext } from "@/app/context/DocumentsContext";
import { Document } from "@/app/types/Document";
import {
  Box,
  List,
  Typography,
  useTheme,
  Button,
  Divider,
} from "@mui/material";

import { useRouter } from "next/navigation";
import DeleteDocumentModal from "../DeleteDocumentModal/DeleteDocumentModal";
import { useState } from "react";
import DocumentListItem from "../DocumentListItem/DocumentListItem";

interface DocumentListProps {
  documents: Document[];
}

const DocumentsList = ({ documents }: DocumentListProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { createDocument, deleteDocument } = useDocumentsContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string>("");

  const handleCreateDocument = () => {
    const { id } = createDocument({
      title: "Novo Documento",
      content: "",
    });

    router.push(`/${id}`);
  };

  const handleOpenModal = (id: string) => {
    setOpenModal(true);
    setDocumentId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
            onClick={handleCreateDocument}
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
            <DocumentListItem
              document={doc}
              onOpen={() => handleOpenModal(doc.id)}
              key={doc.id}
            />
          ))}
        </List>
      </Box>
      <DeleteDocumentModal
        open={openModal}
        closeModal={handleCloseModal}
        documentId={documentId}
      />
    </Box>
  );
};

export default DocumentsList;
