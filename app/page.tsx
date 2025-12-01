import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const markdown = `
# Título
**Negrito**  
_Listas_  
- item 1  
- item 2  

| Nome | Idade |
|------|-------|
| João | 20    |
`;

  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
