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
  documentId: string;
  open: boolean;
  closeModal: () => void;
}

const DeleteDocumentModal = ({
  documentId,
  open,
  closeModal,
}: DeleteDocumentModalProps) => {
  const { deleteDocument } = useDocumentsContext();
  const router = useRouter();

  const handleDeleteDocument = () => {
    deleteDocument(documentId);
    closeModal();
    router.push("/");
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" component="span">
          Excluir Documento
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Typography gutterBottom>Deseja excluir o Documento?</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal} color="error">
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
