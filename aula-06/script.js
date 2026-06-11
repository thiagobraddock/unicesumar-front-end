//variáveis

// let variavel;
const nome = 'Thiago Oliveira';
let totalCompra = 0;
const isActive = true;
const isTeacher = false;
//3 tipos primitivos: string, number e boolean

// console.log(typeof isActive)
// console.log('Nome: '+ nome);

//objetos
const aluno1 = {
  nome: 'thiago oliveira',
  cargo: 'Analista de sistemas',
  isActive: true,
  skills: ['HTML', 'CSS', 'JAVASCRIPT'],
};
// console.log(aluno1.skills[2]);
//para acessar as propriedades de um objeto, usa .
//para acessar os indices de um array, usa [indice]

// Função: bloco de código reutilizavel
function saudacao(nome, sobrenome) {
  return 'Boa noite ' + nome + ' ' + sobrenome;
}

// funcao sem retorno, basicamente executa algo

// funcao com retorno, te da liberdade para fazer o que quiser com o resultado devolvido da funcao.

//PARTE 2
//selecionar / pegar os elementos do DOM
const botaoMensagem = document.querySelector('.btn-mensagem');
const formularioContato = document.querySelector('.formulario-contato');
const inputNome = document.querySelector('.input-nome');
const feedback = document.querySelector('.feedback');

// Evento: click
botaoMensagem.addEventListener('click', () => {
  console.log('MEU DEUS TA FUNCIONANDOOOOOO!!');
  formularioContato.classList.toggle('escondido');
  if (formularioContato.classList.contains('escondido')) {
    botaoMensagem.textContent = 'Enviar mensagem';
  } else {
    botaoMensagem.textContent = 'Cancelar envio';
  }
});

//envio do formulario
formularioContato.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = inputNome.value;
  feedback.innerHTML = `
    <div class="feedback-sucesso">
      <span>Mensagem enviada com sucesso, ${nome}!</span>

      <button class="fechar-feedback">
        ×
      </button>
    </div>
  `;

  //pegar o botao de fechar

  //adicionar evento de click

  // innerHtml = ''

  //reset form
  formularioContato.reset();
});
