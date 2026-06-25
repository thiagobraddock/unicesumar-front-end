// === CACHE EM LOCALSTORAGE =====================================
const VALIDADE = 10 * 60 * 1000; // 10 minutos

const buscarComCache = async (chave, url) => {
  const salvo = localStorage.getItem(chave);
  const cache = salvo ? JSON.parse(salvo) : null;

  // 1. cache fresco: usa e nem chama a API
  if (cache && Date.now() - cache.salvoEm < VALIDADE) {
    return cache.dados;
  }

  // 2. cache velho ou inexistente: tenta a rede
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error('Status ' + resposta.status);
    }
    const dados = await resposta.json();
    localStorage.setItem(chave, JSON.stringify({ dados, salvoEm: Date.now() }));
    return dados;
  } catch (erro) {
    // 3. deu ruim (ex: 403): se tem cache velho, usa ele em vez de quebrar
    if (cache) {
      return cache.dados;
    }
    throw erro;
  }
};

//selecionar os elementos que a API vai preencher

const fotoPerfil = document.querySelector('header img');
const nomePerfil = document.querySelector('header h1');
const cargoPerfil = document.querySelector('.cargo');
const containerProjetos = document.querySelector('.projetos');

const espaco = document.createElement('div');
espaco.style.height = '4000px';
document.querySelector('.projetos').before(espaco);

//de quem eu vou pegar essas informacoes
const usuarioGithub = 'thiagobraddock';

// dados do perfil vindo da API

const carregarPerfil = async () => {
  try {
    const dados = await buscarComCache(
      'cache-perfil',
      `https://api.github.com/users/${usuarioGithub}`,
    );

    //tratar dados que podem vir vazios
    fotoPerfil.src = dados.avatar_url;
    nomePerfil.textContent = dados.name || 'Thiago Oliveira';
    cargoPerfil.textContent = dados.bio || 'Professor e Coordenador';
  } catch (erro) {
    console.log('Não foi possível carregar o perfil', erro);
  }
};

// Projetos vindos dos repositorios
const gradientes = ['projeto-1', 'projeto-2', 'projeto-3'];

const carregarProjetos = async () => {
  //loading com anúncio acessível
  containerProjetos.innerHTML = '<p role="status">Carregando projetos...</p>';

  // per_page=6 pede só 6 repositórios, já ordenados pelos mais recentes

  try {
    const repos = await buscarComCache(
      'cache-projetos',
      `https://api.github.com/users/${usuarioGithub}/repos?sort=update&per_page=9`,
    );
    //atualizar o html com os projetos

    const htmls = repos.map((repo, index) => {
      // index % 3 cicla entre os gradientes: 0, 1, 2, 0, 1, 2...
      const gradiente = gradientes[index % 3];

      // <div class="projeto-imagem ${gradiente}"></div>
      return `
        <article>
          <img
          class="projeto-imagem"
          src="https://opengraph.githubassets.com/${repo.id}/${repo.full_name}"
          alt="Cartão de preview do repositório ${repo.name}"
          width="320" height="160"
          / >
          <h3>${repo.name}</h3>
          <p>${repo.description || 'Repositório sem descrição.'}</p>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${repo.name} no GitHub (abre em nova aba)">Ver no GitHub</a>
        </article>
      `;
    });

    containerProjetos.innerHTML = htmls.join('');
  } catch (erro) {
    containerProjetos.innerHTML =
      '<p role="status">Desculpe, não foi possível carregar os projetos. Tente recarregar a página.</p>';
  }
};

carregarPerfil();
carregarProjetos();
