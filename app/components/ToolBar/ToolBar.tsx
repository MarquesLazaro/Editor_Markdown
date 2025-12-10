"use client";
import {
  Toolbar,
  AppBar,
  useTheme,
  IconButton,
  Box,
  Typography,
  TextField,
  Button,
  Switch,
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

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import NightsStayIcon from "@mui/icons-material/NightsStay";

import { MdTextFields } from "react-icons/md";

import { RefObject, useState } from "react";
import { useRouter } from "next/navigation";
import ToolBarButton from "../ToolBarButton/ToolBarButton";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DeleteDocumentModal from "../DeleteDocumentModal/DeleteDocumentModal";
import Toast from "../Toast/Toast";
import { useThemeContext } from "@/app/context/ThemeContext";
interface ToolBarProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  title: string;
}

const ToolBar = ({ ref, title }: ToolBarProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { updateDocument, currentDocumentId, content, setContent } =
    useDocumentsContext();

  const { theme: themeValue, setTheme } = useThemeContext();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

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

  const handleChangeTheme = () => {
    themeValue === "light" ? setTheme("dark") : setTheme("light");
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

  if (!currentDocumentId) return;

  return (
    <>
      <DeleteDocumentModal
        open={openModal}
        closeModal={handleCloseModal}
        documentId={currentDocumentId}
      />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          borderRadius: 0,
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
              edge="start"
              onClick={handleToDocuments}
              sx={{ mr: 2, color: theme.palette.primary.contrastText }}
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
            <TextField
              variant="standard"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={() =>
                updateDocument(currentDocumentId, { title: newTitle })
              }
              slotProps={{
                input: {
                  disableUnderline: true,
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    cursor: "pointer",
                  },
                  textAlign: "center",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <ToolBarButton onClick={handleChangeTheme}>
              {themeValue === "light" ? <NightsStayIcon /> : <WbSunnyIcon />}
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
