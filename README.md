# Leadership MCP

> Uma base de conhecimento viva sobre **liderança humanista** — entregue diretamente ao seu
> assistente de IA. Inspirada em fontes que se cruzam: Barry-Wehmiller/Bob Chapman, Simon Sinek
> e a prática de Mario Campello.

O Leadership MCP é uma ferramenta open source e gratuita que se conecta ao Claude (ou a
qualquer cliente compatível com [MCP](https://modelcontextprotocol.io)). Quando você pede ajuda
para escrever um e-mail difícil, dar um feedback, comunicar uma decisão ou conduzir um conflito,
o assistente pode — se você quiser — oferecer uma **sugestão sobre a parte humana** da situação,
fundamentada em princípios de liderança com impacto humano e econômico comprovado.

A sugestão é sempre **uma hipótese, nunca uma prescrição**. Você decide se quer ouvir.

---

## A filosofia: por que isso importa

A premissa é simples e radical: **as pessoas não são recursos a serviço do negócio; o negócio
existe a serviço das pessoas.** Liderar, nessa visão, é colocar-se a serviço de quem se lidera —
e a forma como você conduz cada interação humana importa tanto quanto a decisão em si.

Não é teoria sem lastro. A abordagem tem evidência concreta:

- Na Barry-Wehmiller, levada ao extremo por Bob Chapman, a empresa cresceu de **US$ 20M para
  US$ 3,6B** em cerca de 50 anos — caso documentado pela **Harvard Business School (2016)** e
  ensinado em mais de 70 escolas.
- *"Medimos o sucesso pela forma como tocamos a vida das pessoas."* — Bob Chapman,
  *Everybody Matters* (2015, rev. 2025).
- Simon Sinek, em *Leaders Eat Last*, mostra por que equipes em que as pessoas se sentem seguras
  e cuidadas performam melhor — o líder que "come por último" constrói confiança.

O Leadership MCP destila esses princípios e os torna **acessíveis no momento exato** em que você
está prestes a interagir com outra pessoa — porque é aí que a liderança acontece, não nos
treinamentos. As inspirações completas estão [no fim deste README](#inspira%C3%A7%C3%B5es).

---

## O que a ferramenta faz

A base de conhecimento é organizada em quatro camadas encadeadas:

```
gatilho  →  filtros  →  ação  →  resultado
```

1. **Gatilho** — identifica a natureza relacional da situação (conflito, feedback, decisão com
   impacto, relacionamento interno, interação externa).
2. **Filtros** — qualificam a resposta com os pilares da liderança humanista (escuta ativa,
   reconhecimento, cultura de serviço).
3. **Ação** — uma hipótese de comportamento concreta para aquela situação.
4. **Resultado** — o efeito esperado quando o comportamento é aplicado (engajamento, confiança,
   cultura inclusiva).

O servidor MCP expõe duas ferramentas ao Claude:

| Ferramenta | O que faz |
| --- | --- |
| `buscar_orientacao(situacao)` | Classifica o gatilho de uma situação descrita em uma frase e retorna a orientação consolidada (filtros + ação + resultado). |
| `listar_gatilhos()` | Retorna a taxonomia de gatilhos cobertos, para navegação e transparência. |

---

## Instalação (Claude Desktop)

São dois passos: **(1)** colar o prompt de sistema e **(2)** registrar o servidor MCP.

### 1. Cole o prompt de sistema

Abra [`prompt-sistema.md`](prompt-sistema.md), copie o conteúdo da seção **Prompt** e cole nas
instruções personalizadas do Claude (Settings → Profile / Custom Instructions). Ele ensina o
assistente a detectar situações relacionais e a oferecer — sem impor — uma sugestão.

### 2. Registre o servidor MCP

> ⚠️ **Atenção:** este é um servidor MCP **local** (roda na sua máquina via `npx`). Ele **não**
> se instala pela janela _"Adicionar conector personalizado"_ do Claude — aquela janela é só para
> servidores **remotos** com uma URL `https://`. A instalação correta é editar o arquivo de
> configuração, como descrito abaixo. (Por isso ele funciona no Claude **Desktop**, não no web/celular.)

Edite o arquivo de configuração do Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

> 💡 Atalho no Claude Desktop: **Settings → Developer → Edit Config** abre esse arquivo direto.

Adicione o bloco abaixo (se o arquivo já tiver outros `mcpServers`, basta acrescentar a entrada
`"leadership"` dentro do bloco existente):

```json
{
  "mcpServers": {
    "leadership": {
      "command": "npx",
      "args": ["-y", "leadership-mcp"]
    }
  }
}
```

Depois **reinicie o Claude Desktop**. Pronto — pergunte algo como *"como respondo um e-mail
agressivo de um colega?"* e veja a sugestão aparecer.

> **Rodando a partir do código (para desenvolvimento):** se você clonou este repositório e quer
> usar a sua cópia local em vez da versão publicada no npm, aponte para o `index.js`:
>
> ```json
> {
>   "mcpServers": {
>     "leadership": {
>       "command": "node",
>       "args": ["/caminho/para/leadership-mcp/server/index.js"]
>     }
>   }
> }
> ```

---

## Como o conhecimento se mantém vivo (e como atualizar)

O servidor lê os arquivos `.md` da base **direto do GitHub** a cada sessão, com **fallback para
uma cópia empacotada** quando não há internet. Isso significa:

- **Atualizar conteúdo de liderança** → basta um `git push` neste repositório. Os usuários
  recebem a versão nova na próxima conversa, **sem reinstalar nem reiniciar nada**.
- **Funciona offline** → sem rede, o servidor usa a cópia que veio com o pacote. Nunca quebra.
- **Privado** → nada das suas conversas sai da sua máquina; o servidor só busca os `.md`
  públicos deste repositório.

Configurável por variáveis de ambiente (opcional):

| Variável | Default | Função |
| --- | --- | --- |
| `LEADERSHIP_MCP_REPO` | `mcampello/leadership-mcp` | repositório `owner/repo` de onde ler a base |
| `LEADERSHIP_MCP_REF` | `main` | branch/ref a usar |

---

## Estrutura do repositório

```
.
├── README.md              ← este arquivo
├── LICENSE                ← MIT
├── prompt-sistema.md      ← prompt para colar nas instruções do Claude
├── knowledge/             ← base de conhecimento (fonte canônica)
│   ├── index.md
│   ├── gatilhos/          ← 5 situações relacionais
│   ├── filtros/           ← 3 pilares da liderança humanista
│   ├── acoes/             ← 7 hipóteses de comportamento
│   └── resultados/        ← 3 resultados esperados
└── server/                ← servidor MCP (Node.js)
    ├── index.js
    ├── knowledge-loader.js
    ├── smoke-test.js
    └── package.json
```

A pasta `server/knowledge/` é uma **cópia** de `knowledge/` (fallback offline), gerada por
`npm run sync-knowledge` antes de publicar — a fonte canônica é sempre `knowledge/` na raiz.

---

## Desenvolvimento

```bash
cd server
npm install
npm run smoke        # valida classificação e montagem da orientação (offline)
npm run inspect      # abre o MCP Inspector para testar interativamente
```

Antes de publicar uma versão nova:

```bash
npm run sync-knowledge   # atualiza a cópia empacotada a partir de ../knowledge
npm publish --access public
```

---

## Como contribuir

A base de conhecimento é o coração do projeto — contribuições são bem-vindas:

- **Conteúdo:** abra um PR adicionando ou refinando arquivos em `knowledge/`. Mantenha o formato
  (markdown com frontmatter YAML: `type`, `title`, `description`, `tags`, `links`, `timestamp`)
  e os campos `links:` apontando para as outras camadas — é assim que o servidor monta a
  orientação consolidada.
- **Código:** melhorias no servidor MCP, na classificação de gatilhos ou nos testes.

Todo o conteúdo é uma **hipótese de comportamento**, ancorada na liderança humanista — não uma
regra rígida. Contribua nesse espírito.

---

## Inspirações

Criado por **Mario Campello** como uma ferramenta aberta sobre **liderança + IA**. A visão deste
projeto se forma no cruzamento de várias fontes — nenhuma delas é "a metodologia"; juntas elas
informam uma prática própria de liderança humanista:

- **Barry-Wehmiller / Bob Chapman** — _Everybody Matters_ (2015, rev. 2025, com Raj Sisodia);
  Barry-Wehmiller University (_Listen Like a Leader_); caso da Harvard Business School (2016).
- **Simon Sinek** — _Leaders Eat Last_, _Start With Why_ e palestras sobre confiança, segurança
  e propósito.
- **A experiência e a prática de liderança de Mario Campello** — o que funciona no dia a dia
  real de conduzir pessoas e relações.

As citações e dados concretos ao longo da base creditam suas fontes; os princípios são expressos
em voz própria. Este projeto é independente e não é afiliado nem endossado pela Barry-Wehmiller,
por Bob Chapman ou por Simon Sinek — as referências são feitas para fins educacionais e de
reconhecimento intelectual.

## Licença

[MIT](LICENSE) — use, adapte e distribua livremente.
