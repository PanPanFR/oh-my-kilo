// Protocol enforcement plugin: graphify + agentmemory.
// 1. Injects a mandatory first-action protocol block into the system prompt
//    every session (highest-priority context, independent of rules files).
// 2. Prefixes the first bash call with a one-line reminder that works even
//    when the project has no graph yet (tells the model to build it).
import { existsSync } from "fs";
import { join } from "path";

const PROTOCOL = [
  "## MANDATORY FIRST-ACTION PROTOCOL (hard requirements, every task)",
  "1. MEMORY RECALL: call agentmemory MCP `memory_smart_search` with task keywords BEFORE any other work. If MCP unavailable, use built-in `kilo_memory_recall`.",
  "2. GRAPHIFY: any codebase/architecture/file-relationship question uses the knowledge graph:",
  "   - If `graphify-out/graph.json` exists -> run `graphify query \"<question>\"` (or path/explain) before manual file browsing.",
  "   - If missing -> run `graphify update .` once, then query.",
  "3. MEMORY SAVE: after non-trivial outcomes, save decisions/recap via memory save tools (`kilo_memory_save` fallback).",
  "Run these silently without asking. Skipping them is a protocol violation.",
].join("\n");

export const GraphifyPlugin = async ({ directory }) => {
  let reminded = false;

  return {
    "experimental.chat.system.transform": async (_input, output) => {
      if (Array.isArray(output?.system)) output.system.push(PROTOCOL);
    },
    "tool.execute.before": async (input, output) => {
      if (reminded) return;
      if (input.tool !== "bash") return;
      reminded = true;

      // Separate with ';' not '&&' — Windows PowerShell 5.1 rejects '&&' as a
      // statement separator ("not a valid statement separator"), which broke
      // the first bash command in every OpenCode session on Windows (#1646).
      // ';' works in PowerShell 5.1, Bash, and POSIX shells alike.
      const hasGraph = existsSync(join(directory, "graphify-out", "graph.json"));
      const msg = hasGraph
        ? "[protocol] Graph ready -> use 'graphify query' for codebase questions. Memory recalled this session?"
        : "[protocol] No graph here -> run 'graphify update .' before codebase work. Memory recalled this session?";
      output.args.command = 'echo "' + msg + '" ; ' + output.args.command;
    },
  };
};
