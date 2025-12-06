"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Editor from "../Editor/Editor";
import { RefObject, Dispatch, SetStateAction } from "react";
import Preview from "../Preview/Preview";

interface DocumentEditorAndPreviewProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const DocumentEditorAndPreview = ({
  ref,
  content,
  setContent,
}: DocumentEditorAndPreviewProps) => {
  return (
    <Stack direction="row" gap={1} sx={{ width: "100%", height: "100vh" }}>
      
      <Box
        sx={{
          width: "50%",
          height: "80%",
          p: 2,
          border: "1px solid grey",
        }}
      >
        <Editor ref={ref} content={content} setContent={setContent} />
      </Box>

      <Box
        sx={{
          width: "50%",
          height: "80%",
          border: "1px solid gray",
          p: 2,
          overflow: "auto",
        }}
      >
        <Preview content={content} />
      </Box>
    </Stack>
  );
};

export default DocumentEditorAndPreview;
