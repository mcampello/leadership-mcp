# leadership-mcp

> Base de conhecimento viva sobre **liderança humanista** entregue ao seu assistente de IA via
> [MCP](https://modelcontextprotocol.io). Inspirada em fontes que se cruzam — Barry-Wehmiller/Bob
> Chapman, Simon Sinek e a prática de Mario Campello.

Quando você pede ajuda para escrever um e-mail difícil, dar um feedback, comunicar uma decisão
ou conduzir um conflito, o assistente pode — se você quiser — oferecer uma sugestão sobre a
**parte humana** da situação, fundamentada em uma metodologia de liderança com impacto
econômico comprovado. A sugestão é sempre uma hipótese, nunca uma prescrição.

## Instalação (Claude Desktop)

**1.** Edite `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) ou
`%APPDATA%\Claude\claude_desktop_config.json` (Windows):

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

**2.** Cole o prompt de sistema (em [`prompt-sistema.md`](https://github.com/mcampello/leadership-mcp/blob/main/prompt-sistema.md))
nas instruções personalizadas do Claude.

**3.** Reinicie o Claude Desktop.

## Ferramentas expostas

- `buscar_orientacao(situacao)` — classifica o gatilho relacional de uma situação e retorna
  orientação consolidada (filtros + ação + resultado).
- `listar_gatilhos()` — retorna a taxonomia de gatilhos cobertos.

## Como o conhecimento se mantém vivo

O servidor lê a base direto do GitHub a cada sessão (atualização instantânea via `git push`),
com fallback para a cópia empacotada quando offline. Configurável por `LEADERSHIP_MCP_REPO`
(default `mcampello/leadership-mcp`) e `LEADERSHIP_MCP_REF` (default `main`).

## Documentação completa, filosofia e contribuição

👉 **https://github.com/mcampello/leadership-mcp**

## Licença

MIT — Mario Campello. Projeto independente, não afiliado à Barry-Wehmiller, a Bob Chapman ou a
Simon Sinek; as referências são para fins educacionais e de reconhecimento intelectual.
