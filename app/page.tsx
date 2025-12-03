"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";

import ToolBar from "./components/ToolBar/ToolBar";
import Editor from "./components/Editor/Editor";

export default function Home() {
  const [markdown, setMarkdown] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="prose">
      <ToolBar ref={ref} markdown={markdown} setMarkdown={setMarkdown} />

      <Editor ref={ref} markdown={markdown} setMarkdown={setMarkdown} />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
