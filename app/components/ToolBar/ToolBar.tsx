"use client";
import {
  Toolbar,
  AppBar,
  useTheme,
  IconButton,
  Box,
  Alert,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";

import {
  toHeading,
  toInlineCode,
  toItalic,
  toBold,
  toUnorderedList,
  toOrderedList,
  toBlockquote,
} from "@/app/utils/MarkdownApply";
import Snackbar from "@mui/material/Snackbar";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import { MdTextFields } from "react-icons/md";

import { RefObject, Dispatch, SetStateAction, useState } from "react";
import { Folder } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ToolBarButton from "../ToolBarButton/ToolBarButton";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DeleteDocumentModal from "../DeleteDocumentModal/DeleteDocumentModal";
import Toast from "../Toast/Toast";

interface ToolBarProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const ToolBar = ({ ref, content, setContent }: ToolBarProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { updateDocument, currentDocument } = useDocumentsContext();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const selectAndEditText = (editFn: (text: string) => string) => {
    return () => {
      const textarea = ref.current;

      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const selectedText = content.slice(start, end);
      const editedText = editFn(selectedText);

      const newContent =
        content.slice(0, start) + editedText + content.slice(end);

      setContent(newContent);
    };
  };

  const toDocumentList = () => {
    router.push("/");
  };

  const handleSave = () => {
    if (currentDocument) {
      updateDocument(currentDocument.id, { content });
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <DeleteDocumentModal
        open={openModal}
        handleCloseModal={handleCloseModal}
      />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar>
          <Toast
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            message="Documento Salvo"
            severity="success"
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 1,
            }}
          >
            <IconButton color="inherit" edge="start" onClick={toDocumentList}>
              <Folder />
            </IconButton>

            <ToolBarButton onClick={selectAndEditText(toHeading)}>
              <MdTextFields />
            </ToolBarButton>

            <ToolBarButton onClick={selectAndEditText(toBold)}>
              <FormatBoldIcon />
            </ToolBarButton>

            <ToolBarButton onClick={selectAndEditText(toItalic)}>
              <FormatItalicIcon />
            </ToolBarButton>

            <ToolBarButton onClick={selectAndEditText(toInlineCode)}>
              <CodeIcon />
            </ToolBarButton>

            <ToolBarButton onClick={selectAndEditText(toUnorderedList)}>
              <FormatListBulletedIcon />
            </ToolBarButton>

            <ToolBarButton onClick={selectAndEditText(toOrderedList)}>
              <FormatListNumberedIcon />
            </ToolBarButton>

            <ToolBarButton onClick={selectAndEditText(toBlockquote)}>
              <FormatQuoteIcon />
            </ToolBarButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignSelf: "flex-end",
              justifySelf: "flex-end",
              gap: 3,
            }}
          >
            <ToolBarButton onClick={handleSave}>
              <SaveIcon />
            </ToolBarButton>
            <ToolBarButton onClick={handleOpenModal}>
              <DeleteIcon />
            </ToolBarButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ToolBar;
