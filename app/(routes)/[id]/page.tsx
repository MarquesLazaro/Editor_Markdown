"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import ToolBar from "@/app/components/ToolBar/ToolBar";
import { useDocumentsContext } from "@/app/context/DocumentsContext";
import DocumentEditorAndPreview from "@/app/components/DocumentEditorAndPreview/DocumentEditorAndPreview";
import EditableLabel from "@/app/components/EditableLabel/EditableLabel";
import { Document } from "@/app/types/Document";

export default function ViewDocument() {
  const { id } = useParams<{ id: string }>();

  const [content, setContent] = useState<string>("");
  const [document, setDocument] = useState<Document | null>(null);
  const { createDocument, updateDocument, getOneDocument } =
    useDocumentsContext();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const document = getOneDocument(id);

    if (document) {
      setDocument(document);
      setContent(document.content);
    }
  }, [id, getOneDocument]);

  if (!document) return;

  return (
    <>
      <ToolBar ref={ref} content={content} setContent={setContent} />
      <EditableLabel label={document.title} id={document.id} />
      <DocumentEditorAndPreview
        ref={ref}
        content={content}
        setContent={setContent}
      />
    </>
  );
}
