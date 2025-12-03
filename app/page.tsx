"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";
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
      <Button variant="outlined" onClick={selectAndEditText(toH1)}>
        H1
      </Button>
      <Button variant="outlined" onClick={selectAndEditText(toH2)}>
        H2
      </Button>
      <Button variant="outlined" onClick={selectAndEditText(toH3)}>
        H3
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
      <Button variant="outlined" onClick={selectAndEditText(toOrderedList)}>
        Lista Ordenada
      </Button>
      <Button variant="outlined" onClick={selectAndEditText(toBlockquote)}>
        Quote
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
