import TextField from "@mui/material/TextField";
import { RefObject, Dispatch, SetStateAction } from "react";

interface EditorProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
}

const Editor = ({ ref, markdown, setMarkdown }: EditorProps) => {
  return (
    <TextField
      label="Escreva Aqui"
      multiline
      rows={4}
      fullWidth
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      inputRef={ref}
    />
  );
};

export default Editor;
