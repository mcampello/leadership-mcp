# Deploy HTTP (VPS)

O Leadership MCP roda em dois modos a partir do mesmo `index.js`:

- **stdio** (default) — usado pelo pacote npm e pelo Claude Desktop.
- **HTTP** (Streamable HTTP, stateless) — quando `MCP_HTTP_PORT` está definido. É o modo deste deploy.

No VPS, o container fica atrás do Caddy existente (projeto `docs-site`), que faz TLS e valida
o Bearer token. A porta do container não é publicada no host.

## Pré-requisitos

- DNS: `leadership-mcp.campello.me` A → IP do VPS (Caddy emite o TLS automaticamente após propagar).
- Rede docker `docs-site_docs_net` (criada pelo projeto docs-site/Caddy).

## Passos

1. Código no VPS em `/root/leadership-mcp/` (rsync ou git clone do diretório `server/`).

2. `.env` ao lado do `docker-compose.yml` do docs-site, com o token:

   ```
   MCP_BEARER_TOKEN=<openssl rand -hex 32>
   ```

   O bloco do Caddy lê `{$MCP_BEARER_TOKEN}`, então a env precisa chegar ao container Caddy
   (via `env_file`/`environment` no compose do docs-site).

3. Subir o serviço:

   ```sh
   cd /root/leadership-mcp/deploy
   docker compose up -d --build
   ```

4. Adicionar o bloco de `Caddyfile.snippet` ao Caddyfile do docs-site, validar e recarregar:

   ```sh
   docker exec docs_campello_caddy caddy validate --config /etc/caddy/Caddyfile
   docker exec docs_campello_caddy caddy reload --config /etc/caddy/Caddyfile
   ```

## Conectar o Claude Code

```sh
claude mcp add --transport http --scope user leadership https://leadership-mcp.campello.me \
  --header "Authorization: Bearer <MCP_BEARER_TOKEN>"
```

## Verificação

```sh
curl -s https://leadership-mcp.campello.me/mcp \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1.0"}}}'
```
