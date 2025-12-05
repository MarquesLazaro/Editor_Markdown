export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateDocumentDTO = Pick<Document, "title" | "content">;
export type UpdateDocumentDTO = Partial<CreateDocumentDTO>;
