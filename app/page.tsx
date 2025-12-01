"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Home() {
  const [markdown, setMarkdown] = useState<string>("");

  return (
    <div className="prose">
      <TextField
        label="Escreva Aqui"
        multiline
        rows={4}
        fullWidth
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
