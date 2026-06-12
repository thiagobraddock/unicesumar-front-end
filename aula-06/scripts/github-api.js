//selecionar os elementos que a API vai preencher

const fotoPerfil = document.querySelector('header img');
const nomePerfil = document.querySelector('header h1');
const cargoPerfil = document.querySelector('.cargo');
const containerProjetos = document.querySelector('.projetos');

//de quem eu vou pegar essas informacoes
const usuarioGithub = 'thiagobraddock';

// dados do perfil vindo da API

const carregarPerfil = async () => {
  try {
    const resposta = await fetch(
      `https://api.github.com/users/${usuarioGithub}`,
    );

    if (!resposta.ok) {
      throw new Error('Erro ao buscar perfil');
    }

    const dados = await resposta.json();

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
  //loading
  containerProjetos.innerHTML = '<p>Carregando projetos...';

  // per_page=6 pede só 6 repositórios, já ordenados pelos mais recentes

  try {
    const resposta = await fetch(
      `https://api.github.com/users/${usuarioGithub}/repos?sort=update&per_page=9`,
    );
    //se der erro na resposta da requisição, dispara um erro para que o fluxo da aplicação seja interrompido
    if (!resposta.ok) {
      throw new Error('Erro ao buscar repositórios: ' + resposta.status);
    }

    const repos = await resposta.json();
    //atualizar o html com os projetos

    const htmls = repos.map((repo, index) => {
      // index % 3 cicla entre os gradientes: 0, 1, 2, 0, 1, 2...
      const gradiente = gradientes[index % 3];

      return `
        <article>
          <div class="projeto-imagem ${gradiente}"></div>
          <h3>${repo.name}</h3>
          <p>${repo.description || 'Repositório sem descrição.'}</p>
          <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
        </article>
      `;
    });

    containerProjetos.innerHTML = htmls.join('');
  } catch (erro) {}
};

carregarPerfil();
carregarProjetos();
