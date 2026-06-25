# Aula 07 · Acessibilidade Web - Roteiro Completo (1h30)

## 📋 Resumo Executivo
Esta aula transforma o conceito abstrato de "acessibilidade" em práticas concretas e mensuráveis. Vamos revisar a página pessoal, identificar barreiras reais e implementar soluções usando padrões web reconhecidos internacionalmente (WCAG).

**Objetivo final:** Que os alunos entendam que acessibilidade é um processo contínuo, não uma caixa de seleção.

---

## ⏱️ Timeline (90 minutos)

### **Bloco 1: Contexto + Mindset (15 min)**
- [ ] **0-2 min**: Abertura provocativa
- [ ] **2-8 min**: Por que acessibilidade importa (dados + demos)
- [ ] **8-15 min**: Realidade: beneficiários de acessibilidade

### **Bloco 2: Testes Práticos (10 min)**
- [ ] **15-25 min**: Ferramentas de diagnóstico

### **Bloco 3: HTML Semântico (20 min)**
- [ ] **25-45 min**: Estrutura correta, atributos ARIA

### **Bloco 4: CSS Acessível (15 min)**
- [ ] **45-60 min**: Foco, contraste, responsividade

### **Bloco 5: JavaScript + Testes (20 min)**
- [ ] **60-80 min**: Interatividade segura, validação

### **Bloco 6: Prática em Duplas (10 min)**
- [ ] **80-90 min**: Desafio prático + discussão

---

## 📌 BLOCO 1: Contexto + Mindset (15 min)

### **Abertura (2 min)**
> "Imaginem uma página onde o mouse não funciona. Ou onde as cores não existem. Ou onde você não consegue ampliar o texto. Quantas pessoas no Brasil enfrentam isso todos os dias?"

**Estatísticas para mencionar:**
- ~18 milhões de pessoas com deficiência visual no Brasil (IBGE)
- 1 em 4 adultos têm alguma limitação funcional
- Acessibilidade também ajuda: idosos, pessoas em ambientes com pouca luz, conexões lentas, smartphones, etc.

### **Ciclo de vida de uma deficiência (5 min)**

Mostrar que deficiência não é permanente:
```
┌─────────────────────────────────────┐
│   Situacional    │   Temporária   │ Permanente
│ (luz do sol,    │   (braço       │ (cegueira,
│  multidão,      │    quebrado,    │  surdez,
│  mãos ocupadas)  │    cirurgia)    │  paralisia)
└─────────────────────────────────────┘
                    ↑
         Todos nós estaremos aqui
```

### **O "por quê" de cada técnica (8 min)**

Em vez de "você deve fazer isso", explicar **o problema que resolve**:

| Técnica | Problema | Solução |
|---------|----------|---------|
| **HTML semântico** | Leitores de tela não sabem o que é cada elemento | `<button>`, `<label>`, `<nav>` carregam significado |
| **alt text** | Pessoas cegas/com conexão lenta não veem imagens | Describe a imagem em texto |
| **Contraste** | Pessoas com visão baixa/daltonismo não leem | Min. 4.5:1 para texto normal |
| **Teclado** | Pessoas com mobilidade limitada não usam mouse | Tudo acessível via Tab |
| **ARIA** | Leitores de tela não entendem componentes complexos | Adiciona contexto extra |

---

## 🔍 BLOCO 2: Testes Práticos - Ferramentas (10 min)

### **Ferramenta 1: Lighthouse (Chrome DevTools) - 5 min**

**Prática ao vivo:**
1. Abrir a página pessoal no navegador
2. F12 → Lighthouse → Accessibility
3. Mostrar os erros que aparecem
4. Apontar os 3 principais

**O que procurar:**
- ✅ Imagens sem alt text
- ✅ Falta de labels em inputs
- ✅ Contraste insuficiente
- ✅ Headings fora de ordem (h1 → h3 pulando h2)
- ✅ Elementos interativos sem foco visível

### **Ferramenta 2: Simulador de daltonismo - 3 min**

**Chrome DevTools:**
1. F12 → Rendering → Emulate CSS media feature prefers-color-scheme
2. Mostrar como a página fica sem cores

**Mensagem importante:** Se sua página só é usável com cores, você excluiu ~8% das pessoas.

### **Ferramenta 3: Navegação por teclado - 2 min**

**Teste simples:**
1. Desativar mouse
2. Só usando Tab, setas e Enter, consegue usar a página?

Se não conseguir, a página tem problemas.

---

## 🏗️ BLOCO 3: HTML Semântico (20 min)

### **Parte 1: O poder da semântica (7 min)**

**Antes (errado):**
```html
<div class="header">
  <div class="nav">
    <div class="nav-item"><a href="#sobre">Sobre</a></div>
    <div class="nav-item"><a href="#contato">Contato</a></div>
  </div>
</div>

<div class="main">
  <div class="section">
    <div class="title">Meus Projetos</div>
    <p>Descrição...</p>
  </div>
</div>
```

**Depois (correto):**
```html
<header>
  <nav>
    <a href="#sobre">Sobre</a>
    <a href="#contato">Contato</a>
  </nav>
</header>

<main>
  <section>
    <h1>Meus Projetos</h1>
    <p>Descrição...</p>
  </section>
</main>
```

**Por que importa:** Leitores de tela conseguem:
- Pular entre seções (`<nav>`, `<main>`, `<footer>`)
- Entender hierarquia (h1 → h2 → h3)
- Diferenciar links de texto normal

### **Parte 2: Hierarquia de Headings (6 min)**

**Erro comum:**
```html
<h1>Título da página</h1>
<h3>Primeira seção</h3>        ❌ Pulou h2!
<h2>Segunda seção</h2>         ❌ Voltou para trás!
<h4>Subsessão</h4>             ❌ Muito profundo!
```

**Correto:**
```html
<h1>Meu Portfólio</h1>

  <h2>Sobre Mim</h2>
    <h3>Formação</h3>
    <h3>Experiência</h3>

  <h2>Projetos</h2>
    <h3>Projeto 1</h3>
    <h3>Projeto 2</h3>

  <h2>Contato</h2>
```

**Lição:** h1 é como o índice de um livro. Não pule capítulos.

### **Parte 3: Labels, IDs e Formulários (7 min)**

**Erro comum:**
```html
<label>Nome:</label>
<input type="text" />                    ❌ Label não sabe a qual input pertence
```

**Correto:**
```html
<label for="campo-nome">Nome:</label>    ✅ Label conectada ao input
<input id="campo-nome" type="text" />
```

**Por que importa:**
- Leitores de tela associam label ao campo
- Ao clicar na label, o input recebe foco
- Tela menor: label funciona como "botão" para acessar o campo

**Também importante:**
```html
<label>
  <input type="checkbox" />
  Concordo com os termos
</label>
```

Aqui o label envolve o input (funciona igual).

---

## 🎨 BLOCO 4: CSS Acessível (15 min)

### **Parte 1: Foco Visível (5 min)**

**Por que:** Pessoas que usam teclado precisam saber onde estão.

**Erro comum:**
```css
button:focus {
  outline: none;  /* ❌ Remover foco é CRIME de acessibilidade */
}
```

**Correto - Opção 1 (simples):**
```css
button:focus {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}
```

**Correto - Opção 2 (melhor, moderno):**
```css
button:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}
```

Diferença: `focus-visible` só mostra o outline ao navegar com teclado (não com mouse).

**Demo prática:**
- Tab pelo site ao vivo
- Apontar o outline

### **Parte 2: Contraste de Cores (6 min)**

**Padrão WCAG:**
- **Normal:** Mínimo 4.5:1 (texto x fundo)
- **Grande:** Mínimo 3:1 (se texto > 24px bold ou 18px normal)

**Exemplos reais:**
```
✅ Preto (#000) em branco (#fff)     = 21:1 (excelente)
✅ Azul escuro (#003366) em branco   = 5.5:1 (ok)
❌ Cinza (#999) em branco            = 2.5:1 (falha)
❌ Amarelo (#ffff00) em branco       = 1.08:1 (falha)
```

**Ferramenta:** https://webaim.org/resources/contrastchecker/
- Alunos testam em tempo real

### **Parte 3: Não use cor como única informação (4 min)**

**Erro:**
```css
.erro { color: red; }
.sucesso { color: green; }
```

Pessoa daltônica não diferencia.

**Correto:**
```css
.erro { 
  color: red;
  border-left: 4px solid red;
}

.sucesso { 
  color: green;
  border-left: 4px solid green;
  background-image: url('check.svg');
}
```

Agora usa:
- Cor
- Ícone
- Borda
- Fundo

Pessoa daltônica consegue diferenciar.

---

## ⚙️ BLOCO 5: JavaScript + ARIA (20 min)

### **Parte 1: O perigo de esconder com display: none (5 min)**

**Erro comum em um componente que mostra/esconde:**
```html
<button id="btn-menu">Menu</button>
<nav id="menu" style="display: none;">
  <!-- links -->
</nav>

<script>
btn.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});
</script>
```

**Problema:** 
- `display: none` remove do DOM acessível também
- Leitor de tela nunca vê o menu

**Solução com aria-hidden:**
```html
<button id="btn-menu" aria-expanded="false">Menu</button>
<nav id="menu" aria-hidden="true">
  <!-- links -->
</nav>

<script>
btn.addEventListener('click', () => {
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !isOpen);
  menu.setAttribute('aria-hidden', isOpen);
  menu.classList.toggle('escondido');
});
</script>
```

```css
.escondido {
  display: none;
  /* ou opacity: 0; com pointer-events: none; */
}
```

**O que aprendemos:**
- `aria-expanded`: Comunica se está aberto/fechado
- `aria-hidden`: Diz ao leitor de tela para ignorar

### **Parte 2: Mensagens dinâmicas com aria-live (7 min)**

**Cenário:** Formulário envia e mostra sucesso. Leitor de tela não vê a mudança.

**Erro:**
```html
<form id="form">
  <input type="text" />
  <button type="submit">Enviar</button>
</form>
<div id="mensagem"></div>

<script>
form.addEventListener('submit', () => {
  // ... enviar
  mensagem.textContent = 'Sucesso!'; // Leitor de tela não avisa
});
</script>
```

**Correto:**
```html
<form id="form">
  <input type="text" />
  <button type="submit">Enviar</button>
</form>
<div id="mensagem" aria-live="polite" aria-atomic="true"></div>

<script>
form.addEventListener('submit', () => {
  // ... enviar
  mensagem.textContent = 'Seu contato foi enviado com sucesso!';
  // Leitor de tela anuncia automaticamente
});
</script>
```

**aria-live:**
- `polite`: Aguarda a próxima pausa para anunciar
- `assertive`: Interrompe e anuncia imediatamente

**aria-atomic:**
- `true`: Anuncia a mensagem inteira
- `false`: Anuncia só o que mudou

### **Parte 3: Links e botões (8 min)**

**Erro 1: Links genéricos**
```html
<a href="/projeto">Leia mais</a>
<a href="/projeto">Leia mais</a>
<a href="/projeto">Leia mais</a>
```

Leitor de tela: "link, link, link" (inútil)

**Correto:**
```html
<a href="/projeto/portfolio">Leia mais sobre meu portfólio</a>
<a href="/projeto/blog">Leia mais sobre meu blog</a>
<a href="/projeto/app">Leia mais sobre meu app</a>
```

Ou com aria-label:
```html
<a href="/projeto" aria-label="Leia mais sobre meu portfólio">Leia mais</a>
```

**Erro 2: `<div>` com click**
```html
<div onclick="navegar()">Clique aqui</div>  ❌
```

Problemas:
- Teclado não consegue acessar
- Leitores de tela o veem como texto
- Semântica errada

**Correto:**
```html
<button onclick="navegar()">Clique aqui</button>  ✅
```

Ou com link:
```html
<a href="/destino">Clique aqui</a>  ✅
```

---

## 🎯 BLOCO 6: Prática em Duplas (10 min)

### **Desafio 1 (3 min): Diagnóstico**

Cada dupla recebe a página pessoal com ERROS INTENCIONAIS.

**Tarefas:**
1. Rodar Lighthouse (Accessibility)
2. Listar os 3 principais problemas
3. Priorizar por impacto

### **Desafio 2 (5 min): Conserto Rápido**

Cada dupla escolhe UM erro e conserta:

**Opções:**
- [ ] Adicionar labels aos inputs
- [ ] Corrigir hierarquia de headings
- [ ] Melhorar contraste de uma cor
- [ ] Adicionar alt text às imagens
- [ ] Implementar aria-live em uma mensagem dinâmica

**Não pedir para todos consertarem tudo. Foco em QUALIDADE.**

### **Discussão (2 min)**

Cada dupla apresenta em 30 segundos:
- Qual problema encontraram?
- Como consertaram?
- Que impacto teve no Lighthouse?

---

## 📚 Recursos + Referências para os Alunos

### **Padrões Internacionais:**
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/ (referência oficial)
- **Técnicas WCAG**: https://www.w3.org/WAI/WCAG21/Techniques/

### **Ferramentas:**
- **Lighthouse**: Integrado no Chrome DevTools (F12)
- **axe DevTools**: Chrome extension para auditorias profundas
- **WAVE**: https://wave.webaim.org/ (reporta erros no seu site)
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Oracle**: Simulador de daltonismo (desktop)

### **Leitura Adicional:**
- **"A Web para Todos"** - Reinaldo Ferraz (livro gratuito)
- **MDN - Acessibilidade**: https://developer.mozilla.org/pt-BR/docs/Web/Accessibility
- **WebAIM**: https://webaim.org/ (excelente recurso)

### **Checklist Final (para eles levarem):**

```
□ Página tem apenas UM <h1>?
□ Headings estão em ordem (h1 → h2 → h3)?
□ Todas as imagens têm alt text descritivo?
□ Todos os inputs têm <label> conectado?
□ Foco visível em links/botões ao usar Tab?
□ Contraste text/fundo ≥ 4.5:1?
□ Mensagens dinâmicas têm aria-live?
□ Página é navegável só com teclado?
□ Formulário tem validação clara?
□ Cores não são a única informação?
□ Lighthouse Accessibility score ≥ 90?
```

---

## 🎓 Pontos-Chave para Repetir na Aula

1. **"Acessibilidade não é bônus, é requisito"** - Lei de Inclusão da Pessoa com Deficiência (Lei 13.146/2015)

2. **"Semântica é tudo"** - HTML correto resolve 60% dos problemas

3. **"Teste com suas mãos e ouvidos"** - Não é só teoria. Desativa o mouse. Testa com leitor de tela.

4. **"Há beneficiários reais"** - Todo dia, pessoas reais usam a web e dependem disso

5. **"É iterativo"** - Não é "fecho em um dia". É melhorar continuamente

---

## 💡 Extras se sobrar tempo

### **Se acabar rápido:**

1. **Testes com Leitor de Tela (NVDA/JAWS)**
   - Mostrar como navegar uma página "de olhos fechados"
   - Demonstrar diferença entre site acessível e não acessível

2. **Desafio: Melhorar em Conjunto**
   - Aumentar o foco principal em 15 minutos todos juntos
   - Turma decide prioridades

3. **Case Studies Reais**
   - Exemplos de sites que melhoraram acessibilidade
   - Impacto na usabilidade geral

4. **Discussão: Ética em Tech**
   - Quem é excluído quando ignoramos acessibilidade?
   - Custo de ignorar vs. custo de implementar

---

## ✅ Checklist do Professor

Antes de começar:
- [ ] Chrome com DevTools pronto
- [ ] Página pessoal (com erros) aberta em abas
- [ ] Lighthouse testado
- [ ] Conexão internet (para links de recursos)
- [ ] Preparar 3-4 duplas

Durante a aula:
- [ ] Fazer demo ao vivo no Lighthouse
- [ ] Pedir para alunos replicarem em seus notebooks
- [ ] Ir devagar na parte ARIA (é o conceito mais novo)
- [ ] Deixar alunos explorarem as ferramentas

Depois da aula:
- [ ] Compartilhar checklist de acessibilidade
- [ ] Links de recursos (Google Classroom ou email)
- [ ] Sugerir que testem com Lighthouse no portfolio deles

---

## 📊 Métrica de Sucesso

Ao final, cada aluno deve conseguir:
- ✅ Rodar Lighthouse e entender o relatório
- ✅ Identificar 5 problemas comuns
- ✅ Implementar label + input com id
- ✅ Adicionar alt text significativo
- ✅ Usar aria-live em uma situação real
- ✅ Navegar site com teclado
- ✅ Entender POR QUE acessibilidade importa (não só COMO)
