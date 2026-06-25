# Aula 07 · Acessibilidade Web

> Nesta aula vamos revisar a página pessoal criada nas aulas anteriores e aplicar melhorias de acessibilidade em HTML, CSS e JavaScript.

## Objetivo

Melhorar a página para que ela seja mais acessível, compreensível e navegável para diferentes perfis de pessoas usuárias.

## O que vamos revisar

- [ ] Estrutura semântica do HTML
- [ ] Uso correto de títulos
- [ ] Textos alternativos em imagens
- [ ] Links com textos claros
- [ ] Formulários com `label`, `for` e `id`
- [ ] Botões com estado acessível
- [ ] Mensagens dinâmicas com `aria-live`
- [ ] Foco visível no CSS
- [ ] Teste de acessibilidade com Lighthouse

## Parte 1 · Acessibilidade não é detalhe

Acessibilidade significa remover barreiras de acesso à informação e à interação.

Ela beneficia pessoas com deficiência, mas também melhora a experiência de pessoas em diferentes contextos de uso, como navegação por teclado, uso em dispositivos móveis, baixa luminosidade ou limitações temporárias.

## Parte 2 · Estrutura semântica

Antes de adicionar atributos especiais, precisamos garantir que o HTML tenha uma estrutura clara.

Elementos como `header`, `main`, `section`, `footer`, `h1`, `h2`, `button`, `a`, `form`, `label`, `input` e `textarea` já carregam significado para o navegador.

## Parte 3 · Melhorando o formulário

Vamos conectar os textos dos campos aos inputs usando `for` e `id`.

```html
<label for="nome">Nome</label>
<input id="nome" type="text" class="input-nome" autocomplete="name" />
```
