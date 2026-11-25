// One Line, One Laugh — make.fun entry for
// u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a.
//
// Writes a single self-contained funny line (61 characters) to
// /output/entry.txt. Node 24, standard library only. The output is
// fixed: every run produces exactly the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The joke: a three-beat deal with the alarm clock, and a twist —
// the snooze button means nobody wins the morning. One breath,
// no setup, no explanation: the line lands on its own.
const LINE =
  "My alarm and I have a deal: it rings, I snooze, we both lose.";

function checkLine(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // Tightness: no leading or trailing space, so the line starts and
  // ends exactly on a word.
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (Buffer.byteLength(line, "utf8") !== line.length) {
    throw new Error("entry must be plain ASCII so bytes equal characters");
  }
}

checkLine(LINE);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the guarded line");
}
// The gate counts characters, so confirm the file's byte size agrees
// with the line's character count (plain ASCII, no trailing newline).
if (Buffer.byteLength(written, "utf8") !== LINE.length) {
  throw new Error("entry.txt byte length differs from character count");
}
console.log(`wrote ${LINE.length} characters to ${OUT_FILE}: ${LINE}`);
