import { startUnleash } from "unleash-client";
import type { Flags } from "./flags";
import index from "./index.html";

const unleash = await startUnleash({
  appName: process.env.UNLEASH_APP_NAME ?? "unleash-demo",
  url: process.env.UNLEASH_URL ?? "http://localhost:4242/api",
  customHeaders: { Authorization: process.env.UNLEASH_API_TOKEN ?? "" },
  refreshInterval: 2000,
  disableMetrics: true
});

const VENDAS = [1200, 890, 2300, 450, 1750];

function usuarioDaRequisicao(req: Request) {
  return new URL(req.url).searchParams.get("usuarioId") ?? "";
}

function avaliarFlags(usuarioId: string): Flags {
  const contexto = { userId: usuarioId };

  return {
    "mostrar-resumo-novo": unleash.isEnabled("mostrar-resumo-novo", contexto),
    "mostrar-banner-novidades": unleash.isEnabled(
      "mostrar-banner-novidades",
      contexto
    ),
    "beta-tela-nova": unleash.isEnabled("beta-tela-nova", contexto)
  };
}

const servidor = Bun.serve({
  routes: {
    "/": index,

    "/api/flags": req => Response.json(avaliarFlags(usuarioDaRequisicao(req))),

    "/api/resumo": req => {
      const flags = avaliarFlags(usuarioDaRequisicao(req));
      const total = VENDAS.reduce((soma, venda) => soma + venda, 0);

      if (!flags["mostrar-resumo-novo"]) {
        return Response.json({ versao: "antiga", total });
      }

      return Response.json({
        versao: "nova",
        total,
        ticketMedio: Math.round(total / VENDAS.length),
        melhorVenda: Math.max(...VENDAS),
        vendas: VENDAS
      });
    }
  }
});

console.log(`Demo rodando em ${servidor.url}`);
