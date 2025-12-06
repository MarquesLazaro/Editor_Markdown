"use client";

import { RefObject, Dispatch, SetStateAction, useEffect } from "react";

interface EditorProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const Editor = ({ ref, content, setContent }: EditorProps) => {
  useEffect(() => {
    const textarea = ref.current;

    if (textarea) {
      const end = textarea.value.length;

      textarea.focus();
      textarea.setSelectionRange(end, end);
    }
  }, []);

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
      }}
    />
  );
};

export default Editor;
