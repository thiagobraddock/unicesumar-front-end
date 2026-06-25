const fotoPerfil = document.querySelector('header img');
const containerProjetos = document.querySelector('.projetos-demo');
const statTotal = document.querySelector('.stat-total');
const statRenderizados = document.querySelector('.stat-renderizados');
const statCarregadas = document.querySelector('.stat-carregadas');
const botaoCarregarMais = document.querySelector('.btn-carregar-mais');
const botaoReiniciar = document.querySelector('.btn-reiniciar');

const usuarioGithub = 'thiagobraddock';
const BATCH_SIZE = 6;
const MAX_REPOS = 30;
const CACHE_KEY_DEMO = `demo-lazy-repos-${usuarioGithub}`;
const CACHE_TTL_MS = 1000 * 60 * 20;
const PLACEHOLDER_IMAGEM =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220"%3E%3Crect width="320" height="220" fill="%23e2e8f0"/%3E%3C/svg%3E';

let reposDisponiveis = [];
let indiceAtual = 0;
let imagensCarregadas = 0;
let observerImagens;

const lerCache = () => {
  try {
    const bruto = localStorage.getItem(CACHE_KEY_DEMO);
    if (!bruto) return null;

    const cache = JSON.parse(bruto);
    const expirou = Date.now() - cache.salvoEm > CACHE_TTL_MS;
    if (expirou) return null;

    return cache.dados;
  } catch {
    return null;
  }
};

const salvarCache = (dados) => {
  try {
    localStorage.setItem(
      CACHE_KEY_DEMO,
      JSON.stringify({
        salvoEm: Date.now(),
        dados,
      }),
    );
  } catch {
    // Em caso de erro de cache, a demo continua funcional.
  }
};

const gerarFallback = () => {
  return Array.from({ length: MAX_REPOS }, (_, index) => {
    const numero = index + 1;
    return {
      id: 1000 + numero,
      name: `demo-projeto-${numero}`,
      full_name: `${usuarioGithub}/demo-projeto-${numero}`,
      description: `Projeto demonstrativo ${numero} para lazy loading.`,
      html_url: `https://github.com/${usuarioGithub}/demo-projeto-${numero}`,
      preview_url: `https://picsum.photos/seed/demo-lazy-${numero}/640/360`,
    };
  });
};

const atualizarStatus = () => {
  statTotal.textContent = String(reposDisponiveis.length);
  statRenderizados.textContent = String(
    containerProjetos.querySelectorAll('article').length,
  );
  statCarregadas.textContent = String(imagensCarregadas);
};

const iniciarObserver = () => {
  if (!('IntersectionObserver' in window)) return;

  if (observerImagens) {
    observerImagens.disconnect();
  }

  observerImagens = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const img = entrada.target;
        if (!img.dataset.src) {
          observerImagens.unobserve(img);
          return;
        }

        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observerImagens.unobserve(img);
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    },
  );
};

const observarImagensPendentes = (escopo) => {
  const pendentes = escopo.querySelectorAll('img[data-src]');

  if (!('IntersectionObserver' in window)) {
    pendentes.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    return;
  }

  if (!observerImagens) {
    iniciarObserver();
  }

  pendentes.forEach((img) => observerImagens.observe(img));
};

const criarCard = (repo) => {
  const previewSrc =
    repo.preview_url ||
    `https://opengraph.githubassets.com/${repo.id}/${repo.full_name}`;

  const article = document.createElement('article');
  article.innerHTML = `
    <img
      class="projeto-imagem"
      src="${PLACEHOLDER_IMAGEM}"
      data-src="${previewSrc}"
      alt="Cartão de preview do repositório ${repo.name}"
      loading="lazy"
      width="320"
      height="220"
    />
    <h3>${repo.name}</h3>
    <p>${repo.description || 'Repositório sem descrição.'}</p>
    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
  `;

  const img = article.querySelector('img');
  img.addEventListener('load', () => {
    if (img.dataset.contabilizada) return;
    img.dataset.contabilizada = 'sim';
    imagensCarregadas += 1;
    atualizarStatus();
  });

  return article;
};

const renderizarProximoLote = () => {
  if (indiceAtual >= reposDisponiveis.length) return;

  const fim = Math.min(indiceAtual + BATCH_SIZE, reposDisponiveis.length);
  const fragmento = document.createDocumentFragment();

  for (let i = indiceAtual; i < fim; i += 1) {
    fragmento.appendChild(criarCard(reposDisponiveis[i]));
  }

  containerProjetos.appendChild(fragmento);
  observarImagensPendentes(containerProjetos);

  indiceAtual = fim;
  atualizarStatus();

  botaoCarregarMais.disabled = indiceAtual >= reposDisponiveis.length;
};

const buscarRepositorios = async () => {
  const cache = lerCache();
  if (cache?.length) return cache;

  const resposta = await fetch(
    `https://api.github.com/users/${usuarioGithub}/repos?sort=updated&per_page=${MAX_REPOS}`,
  );

  if (!resposta.ok) {
    if (resposta.status === 403 || resposta.status === 429) {
      throw new Error('RATE_LIMIT');
    }
    throw new Error('FETCH_REPOS');
  }

  const repos = await resposta.json();
  salvarCache(repos);
  return repos;
};

const carregarHeader = async () => {
  try {
    const resposta = await fetch(
      `https://api.github.com/users/${usuarioGithub}`,
    );
    if (!resposta.ok) return;

    const perfil = await resposta.json();
    fotoPerfil.src = perfil.avatar_url;
  } catch {
    // Sem bloqueio de tela para erro de perfil.
  }
};

const iniciarDemo = async () => {
  containerProjetos.innerHTML =
    '<p role="status">Preparando demonstração...</p>';
  botaoCarregarMais.disabled = true;

  try {
    await carregarHeader();

    reposDisponiveis = await buscarRepositorios();
  } catch (erro) {
    reposDisponiveis = gerarFallback();

    const aviso = document.createElement('p');
    aviso.className = 'aviso';
    aviso.setAttribute('role', 'status');
    aviso.textContent =
      erro.message === 'RATE_LIMIT'
        ? 'API do GitHub no limite. Usando dados de demonstração local.'
        : 'Falha ao buscar API. Usando dados de demonstração local.';

    containerProjetos.innerHTML = '';
    containerProjetos.appendChild(aviso);
  }

  indiceAtual = 0;
  imagensCarregadas = 0;

  if (!containerProjetos.querySelector('.aviso')) {
    containerProjetos.innerHTML = '';
  }

  iniciarObserver();
  renderizarProximoLote();
  botaoCarregarMais.disabled = false;
};

botaoCarregarMais.addEventListener('click', renderizarProximoLote);
botaoReiniciar.addEventListener('click', iniciarDemo);

iniciarDemo();
