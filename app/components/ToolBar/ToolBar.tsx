"use client";
import {
  Toolbar,
  Button,
  AppBar,
  useTheme,
  IconButton,
  Typography,
  Box,
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

import React, { RefObject, Dispatch, SetStateAction } from "react";
import { Folder } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface ToolBarProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
}

const ToolButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <IconButton
      color="inherit"
      edge="start"
      sx={{
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: 2,
        },
      }}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
};

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
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 48, sm: 48 } }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton color="inherit" edge="start" onClick={toDocumentList}>
            <Folder />
          </IconButton>

          <ToolButton onClick={selectAndEditText(toBold)}>
            <FormatBoldIcon />
          </ToolButton>

          <ToolButton onClick={selectAndEditText(toItalic)}>
            <FormatItalicIcon />
          </ToolButton>

          <ToolButton onClick={selectAndEditText(toInlineCode)}>
            <CodeIcon />
          </ToolButton>

          <ToolButton onClick={selectAndEditText(toUnorderedList)}>
            <FormatListBulletedIcon />
          </ToolButton>

          <ToolButton onClick={selectAndEditText(toOrderedList)}>
            <FormatListNumberedIcon />
          </ToolButton>

          <ToolButton onClick={selectAndEditText(toBlockquote)}>
            <FormatQuoteIcon />
          </ToolButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
