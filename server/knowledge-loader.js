// knowledge-loader.js
//
// Carrega arquivos da base de conhecimento (/knowledge) com a seguinte estratégia:
//   1. Tenta buscar do GitHub raw (conteúdo sempre atualizado — basta um git push no repo).
//   2. Em qualquer falha (sem rede, timeout, 404), cai para a cópia empacotada no pacote npm.
//   3. Cacheia em memória por processo (a base é pequena) para não refazer fetch a cada chamada.
//
// Configurável por env var LEADERSHIP_MCP_REPO no formato "owner/repo" (default abaixo).
// O ref (branch) é configurável por LEADERSHIP_MCP_REF (default "main").

import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// TODO(publicação): confirmar owner/repo público antes de publicar no npm.
const REPO = process.env.LEADERSHIP_MCP_REPO || "mcampello/leadership-mcp";
const REF = process.env.LEADERSHIP_MCP_REF || "main";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${REF}/knowledge`;

// Diretório da cópia empacotada (fallback offline), relativo a este arquivo.
const LOCAL_BASE = join(__dirname, "knowledge");

const FETCH_TIMEOUT_MS = 4000;

// Cache em memória por processo: path relativo -> conteúdo do arquivo.
const fileCache = new Map();

/**
 * Lê um arquivo da base de conhecimento. `relPath` é relativo a /knowledge,
 * ex.: "gatilhos/conflito.md" ou "index.md".
 * Retorna o conteúdo (string) ou null se não encontrar em lugar nenhum.
 */
export async function loadFile(relPath) {
  if (fileCache.has(relPath)) return fileCache.get(relPath);

  let content = await fetchFromGitHub(relPath);
  if (content == null) content = await readLocal(relPath);

  if (content != null) fileCache.set(relPath, content);
  return content;
}

async function fetchFromGitHub(relPath) {
  const url = `${RAW_BASE}/${relPath}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    // Sem rede, timeout, DNS, etc. — silencioso; o fallback local assume.
    return null;
  }
}

async function readLocal(relPath) {
  try {
    return await readFile(join(LOCAL_BASE, relPath), "utf8");
  } catch {
    return null;
  }
}

/**
 * Lista os nomes de arquivo .md de uma subpasta de /knowledge (ex.: "gatilhos").
 * Usa a cópia local como fonte da estrutura (a listagem do GitHub raw exigiria a API).
 */
export async function listDir(subdir) {
  try {
    const entries = await readdir(join(LOCAL_BASE, subdir));
    return entries.filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

/** Extrai o frontmatter YAML simples de um markdown. Retorna { meta, body }. */
export function parseFrontmatter(md) {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(md);
  if (!match) return { meta: {}, body: md };

  const meta = {};
  const lines = match[1].split("\n");
  let currentListKey = null;

  for (const line of lines) {
    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && currentListKey) {
      meta[currentListKey].push(stripQuotes(listItem[1].trim()));
      continue;
    }
    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (kv) {
      const key = kv[1];
      const val = kv[2].trim();
      if (val === "") {
        // Pode ser início de lista ou de bloco — assume lista até prova em contrário.
        meta[key] = [];
        currentListKey = key;
      } else if (val.startsWith("[") && val.endsWith("]")) {
        meta[key] = val
          .slice(1, -1)
          .split(",")
          .map((s) => stripQuotes(s.trim()))
          .filter(Boolean);
        currentListKey = null;
      } else {
        meta[key] = stripQuotes(val);
        currentListKey = null;
      }
    }
  }
  return { meta, body: match[2].trim() };
}

function stripQuotes(s) {
  return s.replace(/^["']|["']$/g, "");
}
