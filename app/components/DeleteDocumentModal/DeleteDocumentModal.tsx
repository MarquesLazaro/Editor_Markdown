"use client";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface DeleteDocumentModalProps {
  open: boolean;
  handleCloseModal: () => void;
}

const DeleteDocumentModal = ({
  open,
  handleCloseModal,
}: DeleteDocumentModalProps) => {
  const { currentDocument, deleteDocument } = useDocumentsContext();
  const router = useRouter();

  const handleDeleteDocument = () => {
    if (currentDocument) {
      deleteDocument(currentDocument.id);
      router.push("/");
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">Excluir Documento</Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Typography gutterBottom>
          Deseja excluir o Documento? Essa é uma operação sem volta.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseModal} color="error">
          Cancelar
        </Button>
        <Button
          onClick={handleDeleteDocument}
          variant="contained"
          color="primary"
        >
          Excluir Documento
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDocumentModal;
