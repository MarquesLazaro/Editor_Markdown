"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import {
  toTitle,
  toInlineCode,
  toItalic,
  toBold,
  toUnorderedList,
} from "./utils/MarkdownApply";

export default function Home() {
  const [markdown, setMarkdown] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

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

  return (
    <div className="prose">
      <Button variant="outlined" onClick={selectAndEditText(toTitle)}>
        Título
      </Button>
      <Button variant="outlined" onClick={selectAndEditText(toBold)}>
        Negrito
      </Button>
      <Button variant="outlined" onClick={selectAndEditText(toItalic)}>
        Italíco
      </Button>
      <Button variant="outlined" onClick={selectAndEditText(toInlineCode)}>
        code
      </Button>
      <Button variant="outlined" onClick={selectAndEditText(toUnorderedList)}>
        Lista desordenada
      </Button>
      <TextField
        label="Escreva Aqui"
        multiline
        rows={4}
        fullWidth
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        inputRef={ref}
      />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
