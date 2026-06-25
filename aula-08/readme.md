ROTEIRO AULA 8 - Otimização de Desempenho Web
Aula 8 · 25/06

PARTE 1 - Por que medir local engana

- [ ] Medir no localhost engana: é o cenário mais otimista, sem rede real e sem distância até o servidor
- [ ] Lighthouse local da página: nota 87 com Speed Index vermelho
- [ ] Se nem no melhor cenário fica verde, é preciso medir onde o usuário está. Primeiro passo: publicar

PARTE 2 - Colocar no ar

- [ ] Duas opções: hospedagem estática simples (GitHub Pages) e plataforma com auto-deploy (Vercel)
- [ ] Publicar pelo GitHub Pages, direto pelo navegador, sem terminal
- [ ] Dois cuidados que quebram o deploy: - caminho sempre com ./ , nunca com / na frente - nome de arquivo idêntico em maiúscula e minúscula, porque o servidor diferencia
- [ ] Vercel como passo seguinte: conecta o mesmo repositório, faz auto-deploy a cada commit e gera link de preview por branch

PARTE 3 - Medir no ar

- [ ] Rodar o Lighthouse na URL publicada, em aba anônima, pra não medir com dados locais sujando o resultado
- [ ] Ler o relatório: a nota e a legenda de cor (vermelho 0-49, laranja 50-89, verde 90-100)
- [ ] As cinco métricas: - FCP: tempo até a primeira coisa aparecer - LCP: tempo até a maior coisa aparecer - TBT: quanto tempo o JavaScript travou a página - CLS: quanto a página pulou enquanto carregava - SI: quão rápido a tela foi preenchida
- [ ] INP não aparece no Lighthouse: é métrica de usuário real; no laboratório o TBT faz as vezes dele. Os três do Google são LCP, INP e CLS
- [ ] Identificar qual elemento é o LCP, geralmente o avatar, que chega tarde porque vem da API
- [ ] Speed Index é o ponto fraco da página, porque o conteúdo é carregado pela API depois do load

PARTE 4 - O que dá pra melhorar

Imagens

- [ ] Na aba Rede, filtrar por Img e observar o peso de cada arquivo
- [ ] Avatar: pedir um tamanho menor ao GitHub (parâmetro &s= na URL) e definir width e height fixos pra evitar layout shift
- [ ] WebP: formato mais leve que PNG e JPG. A página usa imagens remotas, então não há arquivo local pra converter aqui. Demonstração no Squoosh: converter um PNG e comparar os KB

Lazy loading

- [ ] Aplicar loading="lazy" nas imagens dos cards
- [ ] Medir na aba Rede e no Console: nesta página as imagens estão a cerca de 1027px do topo e baixam mesmo assim
- [ ] Motivo: o lazy é avaliado quando a imagem entra na página; a página inteira cabe dentro da margem de pré-carregamento do navegador, então não sobra imagem fora pra adiar
- [ ] Conclusão: o loading="lazy" só rende em página longa, com imagem bem abaixo da dobra
- [ ] Pinterest (br.pinterest.com/ideas) como exemplo que funciona: página muito longa e scroll infinito com IntersectionObserver, que é controle manual e não o atributo puro
- [ ] Diferença final: loading="lazy" é o atalho de uma linha; IntersectionObserver é o controle fino

PARTE 5 - Fechamento

- [ ] Recapitular o ciclo: medir certo, publicar, medir de novo, otimizar o que é real
- [ ] Leitura no livro: minificação, CDN e design patterns
- [ ] Entregas da aula
