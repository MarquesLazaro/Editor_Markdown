"use client";

import { RefObject, Dispatch, SetStateAction } from "react";

interface EditorProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const Editor = ({ ref, content, setContent }: EditorProps) => {
  return (
    <textarea
      value={content}
      ref={ref}
      onChange={(e) => setContent(e.target.value)}
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
  );
};

export default Editor;
