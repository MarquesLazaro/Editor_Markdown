"use client";
import {
  Toolbar,
  AppBar,
  useTheme,
  IconButton,
  Box,
  TextField,
} from "@mui/material";

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

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ToolBarButton from "../ToolBarButton/ToolBarButton";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DeleteDocumentModal from "../DeleteDocumentModal/DeleteDocumentModal";
import Toast from "../Toast/Toast";
import { useThemeContext } from "@/app/context/ThemeContext";
import { MarkdownFormats } from "@/app/types/MarkdownFormats";
import { useEditorContext } from "@/app/context/EditorContext";

const ToolBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const { updateDocument, currentDocumentId, getOneDocument } =
    useDocumentsContext();

  const { theme: themeValue, setTheme } = useThemeContext();
  const { setFormat } = useEditorContext();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const document = getOneDocument(currentDocumentId);

  useEffect(() => {
    if (document) {
      setNewTitle(document.title);
    }
  }, [document]);

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

  const handleOnBlur = () =>
    updateDocument(currentDocumentId, { title: newTitle });

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

            <ToolBarButton
              title="Cabeçalho - Crtl + Shift + H"
              onClick={() => setFormat(MarkdownFormats.heading)}
            >
              <MdTextFields />
            </ToolBarButton>

            <ToolBarButton
              title="Cabeçalho - Crtl + Shift + B"
              onClick={() => setFormat(MarkdownFormats.bold)}
            >
              <FormatBoldIcon />
            </ToolBarButton>

            <ToolBarButton
              title="Cabeçalho - Crtl + Shift + I"
              onClick={() => setFormat(MarkdownFormats.italic)}
            >
              <FormatItalicIcon />
            </ToolBarButton>

            <ToolBarButton
              title="Cabeçalho - Crtl + Shift + K"
              onClick={() => setFormat(MarkdownFormats.code)}
            >
              <CodeIcon />
            </ToolBarButton>

            <ToolBarButton
              title="Cabeçalho - Crtl + Shift + U"
              onClick={() => setFormat(MarkdownFormats.ulist)}
            >
              <FormatListBulletedIcon />
            </ToolBarButton>

            <ToolBarButton
              title="Cabeçalho - Crtl + Shift + O"
              onClick={() => setFormat(MarkdownFormats.olist)}
            >
              <FormatListNumberedIcon />
            </ToolBarButton>

            <ToolBarButton
              title="Cabeçalho - Crtl + Shift + Q"
              onClick={() => setFormat(MarkdownFormats.quote)}
            >
              <FormatQuoteIcon />
            </ToolBarButton>
          </Box>

          <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <TextField
              variant="standard"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleOnBlur}
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
            <ToolBarButton title="Alternar Tema" onClick={handleChangeTheme}>
              {themeValue === "light" ? <NightsStayIcon /> : <WbSunnyIcon />}
            </ToolBarButton>
            <ToolBarButton title="Deletar Documento" onClick={handleOpenModal}>
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
