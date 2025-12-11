"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { MarkdownFormats } from "../types/MarkdownFormats";

interface EditorProviderProps {
  children: ReactNode;
}

interface EditorContextProps {
  format: MarkdownFormats;
  setFormat: Dispatch<SetStateAction<MarkdownFormats>>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export const EditorContext = createContext<EditorContextProps>({
  format: 0,
  setFormat: () => {},
  textareaRef: Object(),
});

const EditorProvider = ({ children }: EditorProviderProps) => {
  const [format, setFormat] = useState<MarkdownFormats>(
    MarkdownFormats.nothing
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const value: EditorContextProps = { format, setFormat, textareaRef };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const editorContext = useContext(EditorContext);

  return editorContext;
};

export default EditorProvider;
