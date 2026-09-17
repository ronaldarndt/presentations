import type { Flags } from './flags';

const seletorUsuario = document.querySelector('#usuario') as HTMLSelectElement;
const listaFlags = document.querySelector('#flags') as HTMLElement;
const banner = document.querySelector('#banner') as HTMLElement;
const resumo = document.querySelector('#resumo') as HTMLElement;

async function buscar<T>(rota: string, usuarioId: string): Promise<T> {
  const resposta = await fetch(`${rota}?usuarioId=${usuarioId}`);
  return resposta.json();
}

async function atualizar() {
  const usuarioId = seletorUsuario.value;
  const flags = await buscar<Flags>('/api/flags', usuarioId);
  const dados = await buscar('/api/resumo', usuarioId);

  listaFlags.innerHTML = Object.entries(flags)
    .map(([nome, ligada]) => `<li class="${ligada ? 'ligada' : 'desligada'}">${nome}</li>`)
    .join('');

  // Flag no frontend: mostra um bloco novo na tela.
  banner.hidden = !flags['mostrar-banner-novidades'];

  // Flag por usuário: troque o usuário e o visual muda.
  document.body.classList.toggle('beta', flags['beta-tela-nova']);

  // Flag no backend: a resposta do endpoint vem diferente.
  resumo.textContent = JSON.stringify(dados, null, 2);
}

seletorUsuario.addEventListener('change', atualizar);

// A tela acompanha ao vivo o que for ligado no Unleash.
setInterval(atualizar, 2000);

atualizar();
