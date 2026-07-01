# White-label — Guia Técnico

**Público:** time técnico do parceiro (ou o Mario, na demo).
**Objetivo:** configurar uma base de conhecimento personalizada via fork do repositório.

## Como funciona

O Leadership MCP lê os arquivos `.md` da base de conhecimento **direto do GitHub** a cada sessão, com fallback para uma cópia empacotada (`server/knowledge/`). Isso permite white-label puro: o parceiro forka o repo, edita o conteúdo, e aponta o servidor para o próprio repositório.

## Passo a passo

### 1. Fork do repositório

```bash
# No GitHub, clique em Fork no repositório mcampello/leadership-mcp
# Ou via CLI:
gh repo fork mcampello/leadership-mcp --remote-name upstream
cd leadership-mcp
```

### 2. Editar a base de conhecimento

A fonte canônica é `knowledge/` na raiz do repositório:

```
knowledge/
  gatilhos/    ← situações relacionais (conflito, feedback, decisão, etc.)
  filtros/     ← pilares da metodologia (o que você ensina)
  acoes/       ← hipóteses de comportamento concretas
  resultados/  ← efeitos esperados
```

Cada arquivo é markdown com frontmatter YAML:

```yaml
---
type: filtro
title: Escuta Ativa
description: Ouvir para entender, não para responder.
tags: [barry-wehmiller, comunicacao]
links:
  - gatilhos/conflito.md
  - acoes/fato-antes-defesa.md
timestamp: 2025-01-15
---
```

**Conteúdo do arquivo:** princípios em voz própria, citações creditadas. Tudo é "hipótese de comportamento".

### 3. Sincronizar a cópia de fallback

```bash
cd server
npm install
npm run sync-knowledge   # copia knowledge/ → server/knowledge/
```

### 4. Configurar o servidor

Duas variáveis de ambiente controlam a origem da base:

| Variável | Default | Exemplo |
| --- | --- | --- |
| `LEADERSHIP_MCP_REPO` | `mcampello/leadership-mcp` | `sua-empresa/leadership-mcp` |
| `LEADERSHIP_MCP_REF` | `main` | `main` |

**Claude Desktop (local):**
```json
{
  "mcpServers": {
    "leadership": {
      "command": "npx",
      "args": ["-y", "leadership-mcp"],
      "env": {
        "LEADERSHIP_MCP_REPO": "sua-empresa/leadership-mcp",
        "LEADERSHIP_MCP_REF": "main"
      }
    }
  }
}
```

**VPS (Streamable HTTP):**
```bash
LEADERSHIP_MCP_REPO=sua-empresa/leadership-mcp \
LEADERSHIP_MCP_REF=main \
MCP_HTTP_PORT=3000 \
node server/index.js
```

### 5. Atualizar conteúdo

Quando você precisa atualizar a base:

```bash
# Edite os arquivos em knowledge/
git add knowledge/
git commit -m "Atualiza filtro: escuta ativa"
git push
```

Os clientes recebem a nova versão na próxima conversa — sem reinstalar, sem restart.

### 6. Deploy centralizado (opcional)

Para rodar um servidor HTTP que múltiplos clientes conectam:

1. Provisione uma VPS (DigitalOcean, Hetzner, etc.)
2. Clone o fork e instale dependências:
   ```bash
   git clone git@github.com:sua-empresa/leadership-mcp.git
   cd leadership-mcp/server
   npm install --production
   ```
3. Configure systemd (ou pm2):
   ```bash
   # /etc/systemd/system/leadership-mcp.service
   [Unit]
   Description=Leadership MCP Server
   After=network.target

   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/opt/leadership-mcp/server
   Environment=LEADERSHIP_MCP_REPO=sua-empresa/leadership-mcp
   Environment=LEADERSHIP_MCP_REF=main
   Environment=MCP_HTTP_PORT=3000
   ExecStart=/usr/bin/node index.js
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```
4. Configure reverse proxy (nginx/Caddy) com HTTPS.

Detalhes completos em `server/deploy/`.

## Front-end (prompt de sistema)

O prompt de sistema (`prompt-sistema.md`) é o que ensina o assistente a detectar situações relacionais. Para white-label completo, o parceiro pode:

1. **Manter o prompt padrão** — funciona com qualquer base.
2. **Personalizar** — ajustar os gatilhos e a linguagem de oferta para a voz da marca.

O prompt também está disponível na landing page com botão de copiar.

## Checklist de rollout

- [ ] Fork criado e push inicial
- [ ] Base de conhecimento editada (gatilhos, filtros, ações, resultados)
- [ ] `npm run sync-knowledge` executado
- [ ] Smoke test passando (`npm run smoke` em `server/`)
- [ ] Variáveis de ambiente configuradas no deploy
- [ ] Prompt de sistema distribuído aos clientes (ou personalizado)
- [ ] Instruções de instalação enviadas aos clientes

## Referências

- [README](../../README.md) — documentação principal
- [CLAUDE.md](../../CLAUDE.md) — arquitetura e convenções do projeto
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — formato dos arquivos e convenções de voz
- `server/deploy/` — guias de deploy HTTP