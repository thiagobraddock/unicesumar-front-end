# Auditoria de Acessibilidade - Aula 07

Data: 2026-06-18
Escopo analisado: index.html, index2.html, estilo.css, scripts/formulario.js, scripts/skills.js, scripts/github-api.js
Referência: WCAG 2.2 (objetivo mínimo: conformidade nível AA)

## Resumo executivo

Foram encontrados problemas que impedem a aula de atingir nível AA com segurança. Os principais riscos estão em:

- relacionamento de rótulos com campos de formulário;
- atualizações dinâmicas sem anúncio para leitores de tela;
- ausência de tratamento acessível de foco e estado em interações;
- contraste insuficiente em texto pequeno;
- arquivo HTML secundário inválido.

## Achados priorizados

## 2) Alto - Labels não associados em campos do formulário de contato

- Evidência: index.html:69-73 usa labels sem atributo for e campos sem id correspondente.
- Critério relacionado: 1.3.1 Info and Relationships (A), 3.3.2 Labels or Instructions (A).
- Problema: o leitor de tela pode não anunciar corretamente o propósito de Email e Mensagem.
- Impacto: preenchimento com erro, ambiguidade e maior taxa de abandono do formulário.
- Explicação de correção: para cada campo, usar id único no input/textarea e for correspondente no label.

## 3) Alto - Campo de skill sem rótulo visível/programático

- Evidência: index.html:41-47 possui apenas placeholder no campo de skill.
- Critério relacionado: 3.3.2 Labels or Instructions (A), 1.3.1 Info and Relationships (A).
- Problema: placeholder não substitui label. Ele desaparece ao digitar e pode não ser anunciado de forma consistente.
- Impacto: menor compreensão para pessoas com deficiência cognitiva, baixa visão e usuários de leitor de tela.
- Explicação de correção: adicionar label associado (visível ou visualmente oculto com técnica acessível) e manter instrução clara.

## 4) Alto - Atualizações dinâmicas sem aria-live

- Evidência:
  - index.html:55 container de projetos sem região de anúncio.
  - scripts/github-api.js:39 e scripts/github-api.js:69 atualizam conteúdo dinamicamente.
  - index.html:78 feedback sem papel de status/alert.
  - scripts/formulario.js:22-30 injeta mensagem de sucesso via innerHTML.
- Critério relacionado: 4.1.3 Status Messages (AA).
- Problema: mudanças de estado e mensagens de sucesso/carregamento não são anunciadas automaticamente ao leitor de tela.
- Impacto: usuário não percebe que projetos carregaram ou que mensagem foi enviada.
- Explicação de correção: aplicar role status ou aria-live politeness adequada nas áreas de feedback e loading.

## 5) Alto - Botão de abrir/fechar formulário sem estado programático

- Evidência:
  - index.html:62 botão Enviar mensagem abre/fecha formulário.
  - scripts/formulario.js:10-15 altera apenas texto do botão.
- Critério relacionado: 4.1.2 Name, Role, Value (A).
- Problema: não há aria-expanded nem aria-controls para indicar relação com o painel de formulário.
- Impacto: usuário de leitor de tela não recebe estado "expandido/recolhido" da ação.
- Explicação de correção: adicionar id ao formulário, aria-controls no botão e sincronizar aria-expanded no clique.

## 6) Médio - Gestão de foco incompleta e comportamento inesperado

- Evidência:
  - scripts/formulario.js:22-39 cria botão de fechar feedback mas não implementa evento de fechamento.
  - scripts/skills.js:54 envia foco para inputNome (campo de outro formulário) após adicionar skill.
- Critério relacionado: 2.4.3 Focus Order (A), 3.2.1 On Focus (A).
- Problema: foco muda para contexto inesperado e há controle visual sem comportamento completo.
- Impacto: navegação por teclado confusa e perda de contexto.
- Explicação de correção: manter foco no próprio fluxo (inputSkill) após submit de skill e implementar fechamento do feedback com foco previsível.

## 7) Médio - Contraste insuficiente no rodapé

- Evidência: estilo.css:135 define cor #94a3b8 no rodapé com fundo #f8fafc e fonte 14px (estilo.css:136).
- Critério relacionado: 1.4.3 Contrast Minimum (AA).
- Problema: contraste estimado abaixo de 4.5:1 para texto normal.
- Impacto: baixa legibilidade para baixa visão e em telas com brilho reduzido.
- Explicação de correção: escurecer a cor do texto do rodapé até atingir ao menos 4.5:1.

## 8) Médio - Links identificados principalmente por cor

- Evidência: estilo.css:100-103 remove underline padrão; estilo.css:109-110 só sublinha no hover.
- Critério relacionado: 1.4.1 Use of Color (A).
- Problema: em estado normal, a distinção de link depende majoritariamente da cor.
- Impacto: pessoas com daltonismo ou baixa percepção de cor podem não reconhecer links como interativos.
- Explicação de correção: manter indicação não cromática em estado normal (ex.: sublinhado persistente ou outro indicador visual robusto).

## 9) Médio - Falta de indicação explícita de nova aba em links externos

- Evidência: scripts/github-api.js:64 usa target \_blank sem aviso textual.
- Critério relacionado: boa prática de previsibilidade (relacionado a 3.2.x).
- Problema: abrir nova aba sem aviso pode desorientar usuários de leitor de tela e teclado.
- Impacto: quebra de contexto de navegação.
- Explicação de correção: informar no texto/aria-label que o link abre nova aba e incluir rel noopener noreferrer.

## 10) Baixo - Tratamento de erro silencioso no carregamento de projetos

- Evidência: scripts/github-api.js:70 possui catch vazio.
- Critério relacionado: 3.3.1 Error Identification (A), 4.1.3 Status Messages (AA), quando aplicado a erros de carregamento.
- Problema: em falha de rede/API, usuário não recebe feedback de erro.
- Impacto: interface parece travada ou incompleta sem explicação.
- Explicação de correção: renderizar mensagem de erro acessível na região de projetos com role status/alert.

## Lacunas para confirmar conformidade AA

- Executar validação automatizada com Lighthouse e axe em mobile e desktop.
- Testar navegação apenas com teclado em toda a página (ordem de foco, foco visível, acionamento de botões e links).
- Testar com leitor de tela (VoiceOver no macOS) para confirmar anúncio de estados dinâmicos.
- Validar contraste com ferramenta de contraste (especialmente textos em cinza e elementos de apoio).

## Conclusão

No estado atual, a aula 07 ainda não atende de forma confiável ao nível AA. Com a correção dos itens 1 a 7, o projeto deve subir significativamente em conformidade e usabilidade para tecnologias assistivas.
