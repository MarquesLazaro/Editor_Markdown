"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Editor from "../Editor/Editor";
import { RefObject, Dispatch, SetStateAction } from "react";
import Preview from "../Preview/Preview";

interface DocumentEditorAndPreviewProps {
  ref: RefObject<HTMLTextAreaElement | null>;
}

const DocumentEditorAndPreview = ({
  ref,
}: DocumentEditorAndPreviewProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        backgroundColor: "red",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Editor ref={ref}/>
      </Box>

      <Box
        sx={{
          width: "50%",
          height: "100%",
          backgroundColor: "#F5F5F5",
          fontSize: "1rem",
          fontFamily: "monospace",
          padding: "1rem",
          
        }}
      >
        <Preview/>
      </Box>
    </Stack>
  );
};

export default DocumentEditorAndPreview;
