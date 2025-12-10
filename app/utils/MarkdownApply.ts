export const toHeading = (text: string) => {
  if (text.length === 0) return text;

  const headingRegex = /^(#+)\s(.*)/;
  const match = text.match(headingRegex);

  if (match) {
    console.log("match");

    const hashes = match[1];
    const hashesCount = hashes.length;
    const content = match[2];

    if (hashesCount >= 6) return content;
    else {
      const newHashes = "#".repeat(hashesCount + 1);

      return `${newHashes} ${content}`;
    }
  } else {
    return `# ${text}`;
  }
};

export const toBold = (text: string) => {
  if (text.length === 0) return text;

  if (text.startsWith("**") && text.endsWith("**")) return text.slice(2, -2);

  return `**${text}**`;
};

export const toItalic = (text: string) => {
  if (text.length === 0) return text;

  if (text.startsWith("*") && text.endsWith("*")) return text.slice(1, -1);

  return `*${text}*`;
};

export const toInlineCode = (text: string) => {
  if (text.length === 0) return text;

  if (text.startsWith("`") && text.endsWith("`")) return text.slice(1, -1);

  return "`" + text + "`";
};

export const toUnorderedList = (text: string) => {
  const elements = text.split("\n");

  if (text.length === 0) return text;

  return elements
    .map((item) => {
      if (item.length === 0) return item;
      if (item.startsWith("- ")) return item.slice(2);

      return `- ${item}`;
    })
    .join("\n");
};

export const toOrderedList = (text: string) => {
  const elements = text.split("\n");

  if (text.length === 0) return text;

  return elements
    .map((item, idx) => {
      if (item.length === 0) return item;
      if (item.startsWith(`${idx + 1}. `)) return item.slice(2);

      return `${idx + 1}. ${item}`;
    })
    .join("\n");
};

export const toBlockquote = (text: string) => {
  if (text.length === 0) return text;

  if (text.startsWith(">")) return text.slice(1);

  return `>${text}`;
};
