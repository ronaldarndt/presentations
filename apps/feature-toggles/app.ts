import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown";
import Highlight from "reveal.js/plugin/highlight";

let deck = new Reveal({
  plugins: [Markdown, Highlight]
});
deck.initialize();

deck.on("fragmentshown", event => {
  console.log(event);
});
