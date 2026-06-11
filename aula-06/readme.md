# Aula 05 · JavaScript Moderno e Sistemas Interativos

> Nesta aula vamos transformar uma lista estática de skills em uma lista dinâmica criada com JavaScript.

---

# Antes da aula

Até agora, nossas skills estavam escritas diretamente no HTML:

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

Isso funciona, mas em aplicações reais normalmente os dados vêm de:

- bancos de dados
- APIs
- arquivos
- localStorage

Por isso, vamos aprender como gerar HTML dinamicamente usando JavaScript.

---

# Passo 1 · Preparando o HTML

Primeiro, vamos deixar a lista vazia.

```html
<section class="skills">
  <h2>O que estou aprendendo</h2>

  <ul class="lista-skills"></ul>
</section>
```

Agora o conteúdo da lista será criado via JavaScript.

---

# Passo 2 · Selecionando a lista

No JavaScript, vamos selecionar o elemento da página.

```js
const listaSkills = document.querySelector('.lista-skills');
```

Aqui usamos:

- querySelector
- classes CSS
- manipulação do DOM

---

# Passo 3 · Criando os dados

Agora vamos criar um array com as skills.

```js
const skills = ['HTML', 'CSS', 'JavaScript', 'Flexbox', 'Responsividade'];
```

Esse array representa nossos dados.

---

# Passo 4 · Renderizando as skills

Agora vamos transformar o array em HTML.

```js
const renderizarSkills = () => {
  const skillsHTML = skills.map((skill) => {
    return `<li>${skill}</li>`;
  });

  listaSkills.innerHTML = skillsHTML.join('');
};
```

Aqui aprendemos:

- arrow functions
- map
- template literals
- innerHTML
- join

---

# Entendendo o map

O map percorre cada item do array.

```js
skills.map((skill) => {
  return `<li>${skill}</li>`;
});
```

Transformação:

```txt
'HTML'
↓
<li>HTML</li>
```

O resultado final será:

```js
['<li>HTML</li>', '<li>CSS</li>', '<li>JavaScript</li>'];
```

---

# Por que usamos join?

O map retorna um array.

Mas o innerHTML precisa de texto.

Por isso usamos:

```js
.join('')
```

Resultado final:

```html
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
```

---

# Passo 5 · Executando a função

Agora precisamos chamar a função.

```js
renderizarSkills();
```

Sem isso, nada aparece na tela.

---

# Resultado final da primeira parte

```js
const listaSkills = document.querySelector('.lista-skills');

const skills = ['HTML', 'CSS', 'JavaScript', 'Flexbox', 'Responsividade'];

const renderizarSkills = () => {
  const skillsHTML = skills.map((skill) => {
    return `<li>${skill}</li>`;
  });

  listaSkills.innerHTML = skillsHTML.join('');
};

renderizarSkills();
```

---

# Passo 6 · Salvando dados no navegador

Agora vamos aprender como manter os dados mesmo após atualizar a página.

O navegador possui um recurso chamado localStorage.

Ele funciona como um pequeno armazenamento local.

---

# Passo 7 · Criando skills padrão

```js
const skillsPadrao = ['HTML', 'CSS', 'JavaScript', 'Flexbox', 'Responsividade'];
```

---

# Passo 8 · Buscando dados salvos

```js
const skillsSalvas = localStorage.getItem('skills');
```

O getItem busca informações armazenadas no navegador.

---

# Passo 9 · Definindo quais skills usar

```js
let skills = skillsPadrao;

if (skillsSalvas) {
  skills = JSON.parse(skillsSalvas);
}
```

Aqui:

- usamos as skills padrão inicialmente
- se existirem dados salvos, usamos eles

---

# Entendendo o JSON.parse

O localStorage só salva texto.

Por isso usamos:

```js
JSON.parse();
```

Ele transforma o texto novamente em array.

---

# Passo 10 · Criando função para salvar

```js
const salvarSkills = () => {
  localStorage.setItem('skills', JSON.stringify(skills));
};
```

Aqui usamos:

- localStorage.setItem
- JSON.stringify

---

# Entendendo o JSON.stringify

O localStorage não consegue salvar arrays diretamente.

Por isso usamos:

```js
JSON.stringify(skills);
```

Ele transforma o array em texto.

---

# Resultado final com localStorage

```js
const listaSkills = document.querySelector('.lista-skills');

const skillsPadrao = ['HTML', 'CSS', 'JavaScript', 'Flexbox', 'Responsividade'];

const skillsSalvas = localStorage.getItem('skills');

let skills = skillsPadrao;

if (skillsSalvas) {
  skills = JSON.parse(skillsSalvas);
}

const renderizarSkills = () => {
  const skillsHTML = skills.map((skill) => {
    return `<li>${skill}</li>`;
  });

  listaSkills.innerHTML = skillsHTML.join('');
};

const salvarSkills = () => {
  localStorage.setItem('skills', JSON.stringify(skills));
};

renderizarSkills();
```

---

# O que aprendemos nesta aula

- Arrays
- Arrow functions
- map
- join
- Template literals
- innerHTML
- Renderização dinâmica
- localStorage
- JSON.parse
- JSON.stringify

---
