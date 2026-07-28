#!/usr/bin/env node
// Enables the "Beta APIs" experiment (internal NBT name: gametest) on a
// Bedrock world's level.dat, in place. Safe to run repeatedly (idempotent).
// Usage: node scripts/enable-beta-apis.mjs <path-to-level.dat>

import fs from 'node:fs';
import nbt from 'prismarine-nbt';

const target = process.argv[2];
if (!target) {
  console.error('Usage: node enable-beta-apis.mjs <path-to-level.dat>');
  process.exit(1);
}

if (!fs.existsSync(target)) {
  console.error(`Not found: ${target} (nothing to patch yet)`);
  process.exit(0);
}

const raw = fs.readFileSync(target);
const { parsed } = await nbt.parse(raw);

const current = parsed.value.experiments;
const alreadyOn =
  current &&
  current.value &&
  current.value.gametest &&
  current.value.gametest.value === 1;

if (alreadyOn) {
  console.log(`[enable-beta-apis] already enabled: ${target}`);
  process.exit(0);
}

parsed.value.experiments = nbt.comp({
  experiments_ever_used: nbt.byte(1),
  gametest: nbt.byte(1),
  saved_with_toggled_experiments: nbt.byte(1),
});

const payload = nbt.writeUncompressed(parsed, 'little');
const header = Buffer.alloc(8);
header.writeInt32LE(10, 0);
header.writeInt32LE(payload.length, 4);
fs.writeFileSync(target, Buffer.concat([header, payload]));

console.log(`[enable-beta-apis] enabled Beta APIs on: ${target}`);
