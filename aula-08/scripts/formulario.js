//selecionar / pegar os elementos do DOM
const botaoMensagem = document.querySelector('.btn-mensagem');
const formularioContato = document.querySelector('.formulario-contato');
const inputNome = document.querySelector('.input-nome');
const feedback = document.querySelector('.feedback');

// Evento: click
botaoMensagem.addEventListener('click', () => {
  console.log('MEU DEUS TA FUNCIONANDOOOOOO!!');
  formularioContato.classList.toggle('escondido');
  const estaAberto = !formularioContato.classList.contains('escondido');

  if (estaAberto) {
    botaoMensagem.textContent = 'Cancelar envio';
    botaoMensagem.setAttribute('aria-expanded', 'true');
    formularioContato.setAttribute('aria-hidden', 'false');
  } else {
    botaoMensagem.textContent = 'Enviar mensagem';
    botaoMensagem.setAttribute('aria-expanded', 'false');
    formularioContato.setAttribute('aria-hidden', 'true');
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
