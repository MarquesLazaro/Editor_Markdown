export const toTitle = (text: string) => {
  if (text.length == 0) return text;

  if (text.startsWith("# ")) return text.slice(2);

  return `# ${text}`;
};

export const toBold = (text: string) => {
  if (text.length == 0) return text;

  if (text.startsWith("**") && text.endsWith("**")) return text.slice(2, -2);

  return `**${text}**`;
};

export const toItalic = (text: string) => {
  if (text.length == 0) return text;

  if (text.startsWith("*") && text.endsWith("*")) return text.slice(1, -1);

  return `*${text}*`;
};

export const toInlineCode = (text: string) => {
  if (text.length == 0) return text;

  if (text.startsWith("`") && text.endsWith("`")) return text.slice(1, -1);

  return "`" + text + "`";
};

export const toUnorderedList = (text: string) => {
  const elements = text.split("\n");

  if (text.length == 0) return text;

  return elements
    .map((item) => {
      if (item.length == 0) return item;
      if (item.startsWith("- ")) return item.slice(2);

      return `- ${item}`;
    })
    .join("\n");
};
