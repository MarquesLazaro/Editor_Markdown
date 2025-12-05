"use client"
import { Toolbar, Button } from "@mui/material";

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

import { RefObject, Dispatch, SetStateAction } from "react";

interface ToolBarProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
}

const ToolBar = ({ ref, markdown, setMarkdown }: ToolBarProps) => {
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
    <Toolbar>
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
    </Toolbar>
  );
};

export default ToolBar;
