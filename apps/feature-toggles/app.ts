import Reveal from "reveal.js";
import { createHighlighter } from "shiki";
import { normalizeIndent } from "./helpers";
// @ts-ignore
import Mermaid from "reveal.js-mermaid-plugin";

async function init() {
  const highlighter = await createHighlighter({
    langs: ["csharp", "json", "md", "typescript"],
    themes: ["dracula"]
  });

  const codeBlocks = document.querySelectorAll("code");

  for (const block of codeBlocks) {
    const code = block.textContent || "";
    const formattedCode = normalizeIndent(code);

    const highlighted = highlighter.codeToHtml(formattedCode, {
      lang: block.dataset.lang || "csharp",
      theme: block.dataset.theme || "dracula"
    });

    block.innerHTML = highlighted;
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
