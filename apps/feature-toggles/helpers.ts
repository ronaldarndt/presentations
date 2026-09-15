export function normalizeIndent(str: string): string {
  const lines = str.split("\n");

  // Find all indentation levels for non-empty lines
  const indents = lines
    .filter(line => line.trim().length > 0)
    .map(line => line.match(/^\s*/)?.[0].length ?? 0);

  // If no indented lines found, return the original string trimmed
  if (indents.length === 0) return str.trim();

  // Find the smallest common indentation
  const minIndent = Math.min(...indents);

  // Remove the common indentation from each line
  return lines
    .map(line => line.slice(minIndent))
    .join("\n")
    .trim();
}
