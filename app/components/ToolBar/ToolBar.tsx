"use client";
import {
  Toolbar,
  Button,
  AppBar,
  useTheme,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
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

import { MdTextFields } from "react-icons/md";

import React, { RefObject, Dispatch, SetStateAction, useState } from "react";
import { Folder } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ToolBarButton from "../ToolBarButton/ToolBarButton";

interface ToolBarProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const ToolBar = ({ ref, content, setContent }: ToolBarProps) => {
  const theme = useTheme();
  const router = useRouter();

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

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        marginBottom: "0.5rem",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 48, sm: 48 } }}>
        <Box sx={{ display: "flex", gap: 1 }}>
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
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
