# Hipermídia e Multimídia: portfólio acadêmico

Portfólio dos trabalhos de André Honorato na disciplina Hipermídia e Multimídia (IFSP).
Endereço: https://hipermidia.andrehonorato.com.br

Stack: Astro 7 (site estático), ilhas React, Tailwind CSS 4, Inter e JetBrains Mono (Fontsource), AOS e lucide-react.

O visual imita uma ilha de edição. A interface é neutra (grafite no tema escuro, papel quente no claro), com azul-petróleo como única cor de destaque. Cada trabalho tem uma capa abstrata, as seções são numeradas como cenas ("Cena 01") e o topo da home mostra uma timeline em que cada clipe abre um trabalho. A referência de estilo foi o Screen Studio, encontrado no Refero.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # checagem de tipos
npm run build    # gera dist/
npm run preview  # serve dist/ localmente
```

## Como adicionar ou editar um trabalho

Cada trabalho é um arquivo Markdown em `src/content/trabalhos/`. O nome do arquivo vira a URL: `jornal-acabou-de-acontecer.md` fica em `/trabalhos/jornal-acabou-de-acontecer/`.

```yaml
---
numero: 3
titulo: "Jornal Acabou de Acontecer (Faz Séculos)"
resumo: "Uma ou duas frases (até 200 caracteres). Vira a meta description."
tipo: video            # video | audio
data: 2026-10-19
duracao: "01:34"       # mm:ss ou hh:mm:ss
ferramentas: ["DaVinci Resolve"]   # nomes iguais aos de `softwares` mostram a logo
tom: ambar             # petroleo | ambar | ciano | grafite (capa abstrata, usada sem pôster)
arte: prisma           # aurora | prisma | onda
equipe: ["André Honorato", "Maria Eduarda"]
midia:
  youtube: WJIsMHdQv7I                          # vídeo no YouTube (ID do link)
  poster: /midia/capa-jornal-acabou-de-acontecer.jpg
  # src: /midia/arquivo.mp3                     # áudio ou vídeo servido pelo próprio site
transcricao: |
  Apresentadora: "Boa noite..."
---

## Proposta
…
```

Os vídeos ficam no YouTube (não listados). A página mostra a capa com um botão de play, e o player do YouTube (domínio youtube-nocookie) só carrega quando alguém clica. O áudio e as capas ficam em `public/midia/`. Capas devem ser 16:9; as atuais têm 1600×900 em JPEG.

Se você mudar o schema em `src/content.config.ts` e o `npm run dev` continuar mostrando dados antigos, limpe o cache de conteúdo:

```bash
rm -rf .astro node_modules/.astro && npx astro sync
```

Os títulos `##` do Markdown viram os itens do menu "Nesta página".

Os dados da disciplina (campus, curso, docentes) e a lista de técnicas da home ficam em `src/data/site.ts`. Cada técnica aponta para um trabalho e para a âncora de um título da página dele. O que ainda está marcado como provisório nesses arquivos depende de confirmação.

## Softwares da disciplina

A seção "Programas usados nos trabalhos" (`src/components/Softwares.astro`) apresenta o DaVinci Resolve e o Audacity, com os textos em `softwares`, dentro de `src/data/site.ts`. Se o campo `ferramentas` de um trabalho tiver o nome exato de um desses programas, o trabalho aparece em "Na disciplina" e a ficha técnica mostra a logo.

Logos (em `public/logos/`), obtidas no Wikimedia Commons:

- `audacity.svg`: "Audacity 4 App Icon.svg", domínio público. A marca Audacity pertence à Muse Group.
- `davinci-resolve.svg`: "DaVinci Resolve 17 logo.svg", domínio público. A marca DaVinci Resolve pertence à Blackmagic Design.

As logos aparecem apenas para identificar os programas usados. O site não tem vínculo com os fabricantes.

## Interações

A troca de páginas usa o `ClientRouter` do Astro: ao abrir um trabalho, a capa do card cresce até virar o player (`transition:name="capa-<id>"`). Como a página não recarrega, scripts que precisam rodar em toda navegação escutam `astro:page-load`.

Na página do trabalho, uma barra no topo mostra o progresso de leitura (CSS `animation-timeline`, sem JavaScript) e o menu "Nesta página" destaca a seção visível. Os cards de trabalho têm um brilho que acompanha o cursor (`data-glow`), só em dispositivos com mouse. Na home, o filtro por formato anuncia o resultado para leitores de tela.

## Acessibilidade

- Link "Pular para o conteúdo", landmarks (`header`, `nav`, `main`, `footer`) e títulos em ordem.
- Foco visível (contorno de 2px na cor de destaque) e áreas de toque de pelo menos 44px.
- Contraste AA nos dois temas, verificado nos tokens de cor.
- Players nativos (operáveis por teclado e leitor de tela), legendas WebVTT para vídeo e transcrição em todos os trabalhos.
- Durações também escritas por extenso para leitores de tela.
- `prefers-reduced-motion` desativa animações. `prefers-color-scheme` define o tema inicial.

## SEO

- URL canônica, Open Graph, Twitter Card e `og.png` (1200×630) em todas as páginas.
- JSON-LD:
  - Home: `WebSite`, `CollectionPage` e `Course`.
  - Páginas de trabalho: `VideoObject` ou `AudioObject`, além de `BreadcrumbList`.
- `sitemap-index.xml` gerado no build. `robots.txt` aponta para ele.
- As URLs terminam com `/` (`trailingSlash: 'always'`), igual ao que o servidor estático entrega.

## Deploy no Coolify

1. Crie um recurso a partir do repositório Git, com Build Pack **Nixpacks**. O `nixpacks.toml` já fixa a versão dos pacotes.
2. Marque **Is it a static site?**. Use `npm run build` como comando de build e `/dist` como diretório de publicação.
3. Em **Domains**, informe `https://hipermidia.andrehonorato.com.br`.
4. No DNS de `andrehonorato.com.br`, crie um registro `A` para `hipermidia` apontando para o IP da VPS. O Coolify emite o certificado HTTPS.
5. Depois de publicar, envie `https://hipermidia.andrehonorato.com.br/sitemap-index.xml` no Google Search Console.
