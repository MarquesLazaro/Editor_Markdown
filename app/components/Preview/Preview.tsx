"use client";

import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typography, Link, Divider } from "@mui/material";
import { type PluggableList } from "unified";
import { type Element } from "hast";
import { useDocumentsContext } from "@/app/context/DocumentsContext";

interface MarkdownRendererProps {
  node?: Element | undefined;
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
  [key: string]: any;
}


const muiRenderers: Components = {
  p: ({ node, ...props }: MarkdownRendererProps) => (
    <Typography
      component="p"
      variant="body1"
      sx={{
        fontFamily: "monospace",
        fontSize: "1rem",
        padding: 0,
        lineHeight: 1,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        m: 0,
      }}
      {...props}
    />
  ),

  hr: ({ node, ...props }: MarkdownRendererProps) => (
    <Divider sx={{ my: 3 }} {...props} />
  ),

  h1: ({ node, ...props }: MarkdownRendererProps) => (
    <Typography
      component="h1"
      variant="h3"
      sx={{ mt: 0, mb: 0.5, fontFamily: "monospace" }}
      {...props}
    />
  ),
  h2: ({ node, ...props }: MarkdownRendererProps) => (
    <Typography
      component="h2"
      variant="h4"
      sx={{ mt: 0, mb: 0.5, fontFamily: "monospace" }}
      {...props}
    />
  ),
  h3: ({ node, ...props }: MarkdownRendererProps) => (
    <Typography
      component="h3"
      variant="h5"
      sx={{ mt: 0, mb: 0.5, fontFamily: "monospace" }}
      {...props}
    />
  ),
  h4: ({ node, ...props }: MarkdownRendererProps) => (
    <Typography
      component="h4"
      variant="h6"
      sx={{ mt: 0, mb: 0.5, fontFamily: "monospace" }}
      {...props}
    />
  ),
  h5: ({ node, ...props }: MarkdownRendererProps) => (
    <Typography
      component="h5"
      variant="subtitle1"
      sx={{ mt: 0, mb: 0.5, fontFamily: "monospace" }}
      {...props}
    />
  ),
  h6: ({ node, ...props }: MarkdownRendererProps) => (
    <Typography
      component="h6"
      variant="subtitle2"
      sx={{ mt: 0, mb: 0.5, fontFamily: "monospace" }}
      {...props}
    />
  ),

  a: ({ node, ...props }: MarkdownRendererProps) => (
    <Link target="_blank" rel="noopener" {...props} />
  ),

  code: ({ node, inline, ...props }: MarkdownRendererProps) => (
    <Typography
      component="code"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: "4px",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        fontSize: "0.9rem",
      }}
      {...props}
    />
  ),
};

const Preview = () => {
  const { content } = useDocumentsContext();

  if (!content) return null;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm] as PluggableList}
      components={muiRenderers}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Preview;
