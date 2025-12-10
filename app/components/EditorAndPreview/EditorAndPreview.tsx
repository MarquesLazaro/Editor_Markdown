"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Editor from "../Editor/Editor";
import { RefObject } from "react";
import Preview from "../Preview/Preview";
import { useTheme } from "@mui/material";

interface EditorAndPreviewProps {
  ref: RefObject<HTMLTextAreaElement | null>;
}

const EditorAndPreview = ({ ref }: EditorAndPreviewProps) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Editor ref={ref} />
      </Box>

      <Box
        sx={{
          width: "50%",
          height: "100%",
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
          fontSize: "1rem",
          fontFamily: "monospace",
          padding: "1rem",
        }}
      >
        <Preview />
      </Box>
    </Stack>
  );
};

export default EditorAndPreview;
