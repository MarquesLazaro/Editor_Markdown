import { useDocumentsContext } from "@/app/context/DocumentsContext";
import { Document } from "@/app/types/Document";
import {
  Box,
  List,
  Typography,
  useTheme,
  Button,
  Divider,
  AppBar,
} from "@mui/material";

import { useRouter } from "next/navigation";
import DeleteDocumentModal from "../DeleteDocumentModal/DeleteDocumentModal";
import { useState } from "react";
import DocumentListItem from "../DocumentListItem/DocumentListItem";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";

interface DocumentListProps {
  documents: Document[];
}

const DocumentsList = ({ documents }: DocumentListProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { createDocument } = useDocumentsContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string>("");

  const handleCreateDocument = () => {
    const { id } = createDocument({
      title: "Novo Documento",
      content: "",
    });

    router.push(`/document/${id}`);
  };

  const handleOpenModal = (id: string) => {
    return () => {
      setOpenModal(true);
      setDocumentId(id);
    };
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "md",
            height: 450,
            overflow: "hidden",
            p: 3,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[2],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Seus Documentos
            </Typography>

            <Button
              variant="contained"
              onClick={handleCreateDocument}
              endIcon={<AddIcon />}
              sx={{
                borderRadius: theme.shape.borderRadius,
              }}
            >
              Novo Documento
            </Button>
          </Box>

          <Divider />

          <List sx={{ mt: 1, maxHeight: 350, overflowY: "auto" }}>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <DocumentListItem
                  key={doc.id}
                  document={doc}
                  onOpen={handleOpenModal(doc.id)}
                />
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  mt: 5,
                  justifySelf: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <InsertDriveFileIcon
                  sx={{
                    fontSize: "8rem",
                    color: theme.palette.text.secondary,
                  }}
                />

                <Typography sx={{ mt: 2 }}>
                  Nenhum Documento Adicionado.
                </Typography>
              </Box>
            )}
          </List>
        </Box>

        <DeleteDocumentModal
          open={openModal}
          closeModal={handleCloseModal}
          documentId={documentId}
        />
      </Box>
    </>
  );
};

export default DocumentsList;
