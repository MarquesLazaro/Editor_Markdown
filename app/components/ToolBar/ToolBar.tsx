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
  toH1,
  toH2,
  toH3,
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
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
}

const ToolBar = ({ ref, markdown, setMarkdown }: ToolBarProps) => {
  const theme = useTheme();
  const router = useRouter();

  const selectAndEditText = (editFn: (text: string) => string) => {
    return () => {
      const textArea = ref.current;

      const start = textArea?.selectionStart;
      const end = textArea?.selectionEnd;

      const selectedText = markdown.slice(start, end);
      const editedText = editFn(selectedText);

      const newMarkdown =
        markdown.slice(0, start) + editedText + markdown.slice(end);

      setMarkdown(newMarkdown);
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

          <ToolBarButton onClick={() => {}}>
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
