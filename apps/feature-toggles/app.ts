import Reveal from "reveal.js";
import { createHighlighter } from "shiki";
import { normalizeIndent } from "./helpers";
// @ts-ignore
import Mermaid from "reveal.js-mermaid-plugin";

const LANGS_BY_EXTENSION: Record<string, string> = {
  cs: "csharp",
  json: "json",
  md: "md",
  ts: "typescript",
  tsx: "typescript"
};

async function init() {
  const highlighter = await createHighlighter({
    langs: ["csharp", "json", "md", "typescript"],
    themes: ["dracula"]
  });

  const codeBlocks = document.querySelectorAll("code");

  for (const block of codeBlocks) {
    const file = block.dataset.file;
    const extension = file?.split(".").pop() ?? "";
    const lang = block.dataset.lang ?? LANGS_BY_EXTENSION[extension] ?? "csharp";

    const code = block.textContent || "";
    const formattedCode = normalizeIndent(code);

    const highlighted = highlighter.codeToHtml(formattedCode, {
      lang,
      theme: block.dataset.theme || "dracula"
    });

    block.innerHTML = highlighted;

    if (file) {
      block
        .closest("pre")
        ?.insertAdjacentHTML("beforebegin", `<div class="code-title">${file}</div>`);
    }
  }

  const deck = new Reveal({
    plugins: [Mermaid],
    history: true,
    autoAnimateDuration: 0.4,
    autoAnimateEasing: "ease"
  });
  deck.initialize();
}

init();
