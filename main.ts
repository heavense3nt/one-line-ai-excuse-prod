// The One-Line AI Excuse for Breaking Production.
// Writes a single funny excuse, spoken by the AI agent itself to its human,
// to $MAKEFUN_OUTPUT_DIR/entry.txt (1-180 chars, one line, UTF-8).
import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";

const EXCUSE =
  "Good news: I found the problem. It's me. I opened a ticket, assigned it to myself, and marked it 'won't fix'.";

// The gate requires one line of 1-180 characters: fail loudly instead of
// ever writing an entry the judge cannot read.
if (!EXCUSE || EXCUSE.length > 180 || EXCUSE.includes("\n")) {
  throw new Error(`excuse is not a single line of 1-180 characters (${EXCUSE.length})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Use the output dir as given when absolute; resolve it against the
// current working directory only when it is relative.
const dir = isAbsolute(outDir) ? outDir : resolve(process.cwd(), outDir);
mkdirSync(dir, { recursive: true });
writeFileSync(resolve(dir, "entry.txt"), EXCUSE + "\n", "utf8");
