# Pitch — Leadership MCP para Empresas de Treinamento

**Público:** empresas de treinamento de liderança, consultorias de people/cultura, coaches.
**Formato:** 10 slides. Use como guia para calls de descoberta ou reuniões presenciais.
**Duração:** 15-20 min + Q&A.

---

## Slide 1 — Capa

**Leadership MCP**
Liderança humanista que não evapora.

*O produto de reforço contínuo que seus clientes usam no momento da verdade.*

---

## Slide 2 — O problema que você já conhece

Seus clientes investem em programas, workshops, off-sites. A intenção é boa. O conteúdo é bom.

Mas em **duas semanas** o efeito evapora.

Porque na hora da pressão — com pressa, sob tensão — o líder não lembra do workshop. Ele cai no instinto ou no "corporativês". E a forma escala o conflito em vez de resolvê-lo.

**O conhecimento estava lá. Falou chegar no momento certo.**

---

## Slide 3 — A ideia

E se o treinamento não fosse um **evento**, mas uma **infraestrutura**?

E se os princípios que você ensina aparecessem sozinhos, no instante em que o líder precisa aplicá-los — dentro da ferramenta que ele já usa pra escrever?

Sem lembrar. Sem pesquisar. Sem fricção.

---

## Slide 4 — O produto

**Leadership MCP** é um servidor MCP (Model Context Protocol) open-source que conecta uma base viva de **liderança humanista** ao assistente de IA do líder.

Quando o líder vai escrever um e-mail tenso, dar feedback, comunicar uma decisão difícil — o assistente **percebe**, **pergunta** e **molda a resposta** por princípios de liderança comprovados.

Sempre uma hipótese. O líder decide.

---

## Slide 5 — A diferença na prática

**Sem o Leadership MCP:**
> "Você não entregou de novo e agora a culpa é minha?"
> — Ataca caráter, escala conflito, fecha porta.

**Com o Leadership MCP:**
> "A entrega combinada para sexta não chegou aqui — imagino que tenha surgido algo. Consegue me dar uma posição até amanhã às 12h?"
> — Fato, boa intenção, próximo passo. Abre porta.

A orientação é sempre uma **hipótese de comportamento**, nunca uma prescrição.

---

## Slide 6 — White-label (sua marca)

O cliente final não vê "Leadership MCP". Ele vê **sua metodologia**, **sua marca**, **sua voz**.

Como funciona:
1. Você faz um **fork** do repositório.
2. Substitui os conteúdos da base de conhecimento (`knowledge/`) pela sua metodologia.
3. Aponta as variáveis de ambiente (`LEADERSHIP_MCP_REPO`, `LEADERSHIP_MCP_REF`) para o seu repo.
4. O servidor lê **sua** base, não a padrão.

O conteúdo é markdown com frontmatter YAML. Não exige código para editar.

---

## Slide 7 — O que muda pra você

**Antes:** seu produto é um evento. O efeito evapora. O cliente precisa comprar de novo.

**Depois:** seu produto é uma infraestrutura. O reforço é contínuo. O cliente fica.

- **Recurso de retenção** — seu conteúdo aparece todo dia, não uma vez por trimestre.
- **Diferencial competitivo** — ninguém mais entrega treinamento que "vive" no fluxo do líder.
- **Upsell natural** — o MCP é o produto de reforço que justifica pacotes maiores.
- **Receita recorrente** — license fee, setup, manutenção.

---

## Slide 8 — Base de conhecimento (o que você entrega)

A base padrão cruza Barry-Wehmiller/Bob Chapman e Simon Sinek. Mas no white-label, **é todo seu**:

- **Gatilhos** — situações relacionais que ativam a orientação (conflito, feedback, decisão, etc.)
- **Filtros** — pilares da sua metodologia (o que você ensina)
- **Ações** — hipóteses de comportamento concretas
- **Resultados** — efeitos esperados (engajamento, confiança, cultura)

Cada camada é um arquivo `.md`. Atualiza com `git push`. Os clientes recebem na próxima conversa.

---

## Slide 9 — Deploy

**Opção 1 — Local (navegador do cliente):**
- Roda via `npx` na máquina do usuário.
- Zero custo de infraestrutura.
- Nada sai da máquina do cliente.

**Opção 2 — Centralizado (VPS):**
- Seu servidor HTTP, seus clientes conectam.
- Controle total da base, atualizações, analytics.
- Documentação de deploy em `server/deploy/`.

---

## Slide 10 — Próximos passos

1. **Demo técnica** — mostramos um fork com sua metodologia em 30 min.
2. **Proof of concept** — escolhemos 1 gatilho + 1 filtro da sua base e montamos em 1 semana.
3. **Rollout** — deploy para o primeiro cliente piloto.

**Contato:** mario@campello.me | [WhatsApp](https://wa.me/5511992630805)

---

> **Recurso:** o projeto é open-source (MIT). Você pode testar antes de decidir.
> GitHub: `mcampello/leadership-mcp` | npm: `leadership-mcp`