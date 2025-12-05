"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import ToolBar from "@/app/components/ToolBar/ToolBar";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DocumentEditorAndPreview from "@/app/components/DocumentEditorAndPreview/DocumentEditorAndPreview";

export default function DocumentEditor() {
  const { id } = useParams<{ id: string }>();

  const [content, setContent] = useState<string>("");
  const { createDocument, updateDocument, getOneDocument } =
    useDocumentsContext();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const document = getOneDocument(id);

    if (document) {
      setContent(document.content);
    }
  }, [id, getOneDocument]);

  return (
    <>
      <ToolBar ref={ref} markdown={content} setMarkdown={setContent} />
      <DocumentEditorAndPreview
        ref={ref}
        content={content}
        setContent={setContent}
      />
    </>
  );
}
