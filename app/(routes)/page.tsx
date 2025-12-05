"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import ToolBar from "../components/ToolBar/ToolBar";
import Editor from "../components/Editor/Editor";

export default function Home() {
  const [markdown, setMarkdown] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="prose">
      <ToolBar ref={ref} markdown={markdown} setMarkdown={setMarkdown} />

      <Stack direction="row" gap={1} sx={{ width: "100%", height: "100vh" }}>
        <Box
          sx={{
            width: "50%",
            height: "80%",
            p: 2,
            border: "1px solid grey",
          }}
        >
          <textarea
            value={markdown}
            ref={ref}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Escreva aqui..."
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              resize: "none",
              outline: "none",
              fontSize: "1rem",
              fontFamily: "monospace",
              background: "transparent",
              boxSizing: "border-box",
              overflow: "visible",
            }}
          />
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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </Box>
      </Stack>
    </div>
  );
}
