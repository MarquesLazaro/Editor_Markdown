"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import ToolBar from "../components/ToolBar/ToolBar";
import Editor from "../components/Editor/Editor";
import { useDocumentsContext } from "../context/DocumentsContext";

import Typography from "@mui/material/Typography";

const EditableLabel = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("Sem nome");

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const disableEditing = () => {
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={disableEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter") disableEditing();
          }}
          size="small"
          autoFocus
        />
      ) : (
        <Typography onDoubleClick={handleDoubleClick}>{value}</Typography>
      )}
    </>
  );
};

export default function Home() {
  const [markdown, setMarkdown] = useState<string>("");
  const { createDocument } = useDocumentsContext();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    createDocument({ title: "sem nome", content: markdown });
  }, []);

  return (
    <div className="prose">
      <ToolBar ref={ref} markdown={markdown} setMarkdown={setMarkdown} />

      <EditableLabel />

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
