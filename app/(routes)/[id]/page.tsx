"use client";

import { useRef, useState } from "react";

import ToolBar from "@/app/components/ToolBar/ToolBar";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DocumentEditorAndPreview from "@/app/components/DocumentEditorAndPreview/DocumentEditorAndPreview";

export default function DocumentEditor() {
  const [content, setContent] = useState<string>("");
  const { createDocument, updateDocument, getOneDocument } =
    useDocumentsContext();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="prose">
      <ToolBar ref={ref} markdown={content} setMarkdown={setContent} />
      <DocumentEditorAndPreview
        ref={ref}
        content={content}
        setContent={setContent}
      />
    </div>
  );
}
