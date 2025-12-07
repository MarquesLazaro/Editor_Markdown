"use client";
import { Toolbar, AppBar, useTheme, IconButton, Box } from "@mui/material";

import {
  toHeading,
  toInlineCode,
  toItalic,
  toBold,
  toUnorderedList,
  toOrderedList,
  toBlockquote,
} from "@/app/utils/MarkdownApply";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";

import { MdTextFields } from "react-icons/md";

import { RefObject, Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import ToolBarButton from "../ToolBarButton/ToolBarButton";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DeleteDocumentModal from "../DeleteDocumentModal/DeleteDocumentModal";
import Toast from "../Toast/Toast";
import EditableLabel from "../EditableLabel/EditableLabel";
import { Home } from "@mui/icons-material";

interface ToolBarProps {
  ref: RefObject<HTMLTextAreaElement | null>;
}

const ToolBar = ({ ref }: ToolBarProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { updateDocument, currentDocument, content, setContent } =
    useDocumentsContext();
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

  const handleToDocuments = () => {
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

  if (!currentDocument) return;

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
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleToDocuments}
              sx={{ mr: 2 }}
            >
              <HomeFilledIcon />
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

          <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <EditableLabel />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flex: 1,
              justifyContent: "flex-end",
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

        <Toast
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message="Documento Salvo"
          severity="success"
        />
      </AppBar>
    </>
  );
};

export default ToolBar;
