"use client";

import { useDocumentsContext } from "@/app/context/DocumentsContext";
import { useEditorContext } from "@/app/context/EditorContext";
import { MarkdownFormats } from "@/app/types/MarkdownFormats";
import { SaveStatus } from "@/app/types/SaveStatus";
import {
  toBlockquote,
  toBold,
  toHeading,
  toInlineCode,
  toItalic,
  toOrderedList,
  toUnorderedList,
} from "@/app/utils/MarkdownApply";
import { useTheme } from "@mui/material";
import { useEffect } from "react";

const Editor = () => {
  const { currentDocumentId, content, setContent, undo, setSaveStatus } =
    useDocumentsContext();
  const { textareaRef, format, setFormat } = useEditorContext();
  const theme = useTheme();

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      const end = textarea.value.length;

      textarea.focus();
      textarea.setSelectionRange(end, end);
    }
  }, []);

  useEffect(() => {
    if (format === MarkdownFormats.bold) {
      selectAndEditText(toBold);
    } else if (format === MarkdownFormats.heading) {
      selectAndEditText(toHeading);
    } else if (format === MarkdownFormats.italic) {
      selectAndEditText(toItalic);
    } else if (format === MarkdownFormats.code) {
      selectAndEditText(toInlineCode);
    } else if (format === MarkdownFormats.quote) {
      selectAndEditText(toBlockquote);
    } else if (format === MarkdownFormats.ulist) {
      selectAndEditText(toUnorderedList);
    } else if (format === MarkdownFormats.olist) {
      selectAndEditText(toOrderedList);
    }

    setFormat(MarkdownFormats.nothing);
  }, [format]);

  const selectAndEditText = (editFn: (text: string) => string) => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = content.slice(start, end);
    const editedText = editFn(selectedText);

    const newContent =
      content.slice(0, start) + editedText + content.slice(end);

    setContent(newContent);

    textarea.value = newContent;
    const newEnd = start + editedText.length;

    textarea.setSelectionRange(start, newEnd);
    textarea.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
      const key = e.key.toLowerCase();
      e.preventDefault();

      switch (key) {
        case "b":
          setFormat(MarkdownFormats.bold);
          break;
        case "i":
          setFormat(MarkdownFormats.italic);
          break;
        case "h":
          setFormat(MarkdownFormats.heading);
          break;
        case "u":
          setFormat(MarkdownFormats.ulist);
          break;
        case "o":
          setFormat(MarkdownFormats.olist);
          break;
        case "k":
          setFormat(MarkdownFormats.code);
          break;
        case "q":
          setFormat(MarkdownFormats.quote);
          break;
        case "z":
          undo();
        default:
          break;
      }
    }
  };

  if (!currentDocumentId) return null;

  return (
    <textarea
      value={content}
      ref={textareaRef}
      id="conteudo"
      name="conteudo"
      onChange={(e) => {
        setSaveStatus(SaveStatus.SAVING);
        setContent(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      placeholder="Escreva aqui..."
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        resize: "none",
        outline: "none",
        fontFamily: "monospace",
        fontSize: "1rem",
        padding: "1rem",
        lineHeight: 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    />
  );
};

export default Editor;
