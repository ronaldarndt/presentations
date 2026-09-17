# Demo Unleash

Demonstração ao vivo de feature toggles com o Unleash. Mostra três situações: uma flag avaliada no
servidor que muda a resposta de um endpoint, uma flag que mostra um bloco novo na tela e uma flag que
depende do usuário selecionado.

O servidor é um fullstack do Bun: `servidor.ts` serve as rotas de API e o `index.html` com o
`cliente.ts` já empacotado. Só o servidor fala com o Unleash. A tela pede as flags em
`/api/flags?usuarioId=...`, então a mesma flag é avaliada em um lugar só.

## Instalar

Na raiz do repositório:

```sh
bun install
```

## Configurar

Copie `.env.example` para `.env` e preencha. O Bun carrega o `.env` sozinho.

- `UNLEASH_URL`: URL da API do Unleash, com `/api` no final. Padrão `http://localhost:4242/api`.
- `UNLEASH_API_TOKEN`: token de cliente (server-side), criado em Admin, API access. Precisa ser do
  projeto e do ambiente onde as flags estão.
- `UNLEASH_APP_NAME`: nome da aplicação que aparece no Unleash. Padrão `unleash-demo`.

## Rodar

Dentro de `apps/unleash-demo`:

```sh
bun run dev
```

A demo sobe em `http://localhost:3000`. Para trocar a porta, use a variável `PORT`.

O `bun run build` gera a versão empacotada em `dist`.

## Flags que precisam existir no Unleash

| Flag                       | Estratégia                                                        | Efeito                                                                                               |
| -------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `mostrar-resumo-novo`      | padrão (Standard)                                                 | `/api/resumo` devolve ticket médio, melhor venda e a lista de vendas. Desligada, devolve só o total. |
| `mostrar-banner-novidades` | padrão (Standard)                                                 | A tela mostra o bloco Novidades.                                                                     |
| `beta-tela-nova`           | `userWithId` com os ids `1`, `2` e `3`, ou `gradualRolloutUserId` | A tela troca de cores para o usuário que está no rollout.                                            |

Os ids `1`, `2` e `3` são os usuários do seletor da tela (Ana, Bruno e Carla). O servidor envia o id
escolhido como `userId` no contexto do Unleash, que é o que as duas estratégias por usuário usam.

## O que observar na demo

1. Ligar `mostrar-resumo-novo` no Unleash muda o JSON de `/api/resumo` na tela, sem reiniciar o
   servidor. É a flag avaliada no backend.
2. Ligar `mostrar-banner-novidades` faz aparecer o bloco Novidades. É a flag avaliada na tela.
3. Com `beta-tela-nova` restrita a um dos ids, trocar de usuário no seletor liga e desliga o visual
   beta. A flag é a mesma para todo mundo, o que muda é o contexto enviado ao Unleash.

O SDK do servidor recarrega as flags a cada 2 segundos e a tela consulta o servidor a cada 2
segundos, então a mudança feita no Unleash aparece em poucos segundos.
