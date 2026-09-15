import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown";
import { createHighlighter } from "shiki";
import { normalizeIndent } from "./helpers";

async function init() {
  const highlighter = await createHighlighter({
    langs: ["csharp", "json", "md"],
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
    plugins: [Markdown],
    history: true
  });
  deck.initialize();
}

init();
