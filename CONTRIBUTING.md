# Como contribuir

Que bom que você quer entrar junto. 🙌

Essa base de liderança humanista cresce com gente — com referências que você admira, situações que
você viveu, e olhares que eu sozinho não teria. **Você não precisa saber programar para contribuir.**
Existem dois caminhos; escolha o que for mais confortável.

---

## Caminho 1 — Abrir uma issue (o mais fácil)

Você descreve o que tem em mente e eu recebo, respondo e levo para a base. Sem código, sem Git.

1. **Tenha uma conta GitHub** — é gratuita e leva um minuto em [github.com/signup](https://github.com/signup).
2. Vá em **[Issues → New issue](https://github.com/mcampello/leadership-mcp/issues/new/choose)** e
   escolha o formulário:
   - **💡 Sugerir autor ou referência** — um livro, pensador ou ideia que deveria inspirar a base.
   - **✍️ Sugerir conteúdo** — uma situação de liderança que ainda não está coberta.
   - **🐞 Reportar um problema** — algo errado, confuso ou desatualizado.
3. **Preencha e envie.** A conversa começa ali mesmo.

É o caminho ideal se você quer **sugerir uma ideia** sem precisar escrevê-la no formato final — eu
cuido da parte técnica.

---

## Caminho 2 — Editar pelo navegador (sem instalar nada)

Se você topa mexer no texto, dá pra editar qualquer arquivo da base direto no site do GitHub — ele
cuida do resto:

1. Abra o arquivo que quer mudar dentro da pasta [`knowledge/`](knowledge/).
2. Clique no ícone de **lápis ✏️** (_Edit this file_), no canto superior direito do arquivo.
3. Faça sua edição.
4. Lá embaixo, escreva uma frase curta descrevendo o que mudou e clique em **Propose changes**.
5. Na tela seguinte, clique em **Create pull request**.

Pronto: você criou uma **proposta de mudança** (um _pull request_) sem usar nenhuma ferramenta. Eu
recebo, reviso e converso com você ali mesmo se precisar ajustar algo.

---

## O formato dos arquivos da base

A base vive na pasta [`knowledge/`](knowledge/) e é organizada em quatro camadas encadeadas:

> **gatilho → filtros → ação → resultado**

- **gatilho** — a natureza relacional da situação (conflito, feedback, decisão com impacto…).
- **filtro** — um pilar de comportamento da liderança humanista (escuta ativa, reconhecimento…).
- **ação** — uma hipótese de comportamento concreta para aquela situação.
- **resultado** — o efeito esperado (engajamento, confiança, cultura inclusiva).

Cada arquivo é um markdown que começa com um bloco de **frontmatter** (entre `---`). A **regra de
ouro** é o campo `links:` — ele conecta uma camada às outras, e é exatamente isso que o servidor lê
para montar a orientação consolidada. Se você adicionar um arquivo sem `links:`, ele fica solto e
não entra na orientação.

Exemplo real (um gatilho):

```yaml
---
type: trigger
title: Conflito
description: Situações de tensão explícita ou implícita entre pessoas dentro da organização.
tags: [conflito, tensão, crise, desentendimento]
links:
  - filtros/escuta-ativa.md
  - acoes/durante-o-conflito.md
timestamp: 2026-06-25
---

# Gatilho: Conflito

(conteúdo em markdown a partir daqui…)
```

Campos do frontmatter: `type`, `title`, `description`, `tags`, `links`, `timestamp`. Para se guiar,
o melhor é abrir um arquivo parecido na mesma pasta (`gatilhos/`, `filtros/`, `acoes/`,
`resultados/`) e seguir o mesmo padrão.

---

## A voz da base

Um detalhe importante para contribuições de conteúdo: a base fala em **voz própria**. Os princípios
são expressos como nossos, não como citação de terceiros. Cite uma fonte **só quando** houver uma
**citação direta** ou um **dado concreto** (um número, um caso documentado) — aí o crédito vem
inline. Fora disso, escreva a ideia com as suas palavras, sem atribuição. Isso mantém a base coerente
e independente.

---

## Para desenvolvedores

Quer mexer no servidor MCP, na classificação de gatilhos ou nos testes?

```bash
cd server
npm install
npm run smoke        # valida classificação e montagem da orientação (offline)
npm run inspect      # abre o MCP Inspector para testar interativamente
```

A pasta `server/knowledge/` é uma **cópia** de `knowledge/` (fallback offline). Se você editar a
base, espelhe a cópia antes de publicar:

```bash
npm run sync-knowledge   # atualiza a cópia empacotada a partir de ../knowledge
```

A fonte canônica é sempre `knowledge/` na raiz.

---

## O espírito

Todo o conteúdo é uma **hipótese de comportamento**, ancorada na liderança humanista — não uma regra
rígida. Contribua nesse espírito: propondo, não impondo. Toda ideia é bem-vinda, e a base melhora
aos poucos, com cada contribuição. Obrigado por fazer parte. 💛
