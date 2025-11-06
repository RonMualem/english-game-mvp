
// Seed words from data/vocab.json
import { prisma } from '../lib/db';
import fs from 'fs';
import path from 'path';

async function main() {
  const file = path.join(process.cwd(), 'data', 'vocab.json');
  const raw = fs.readFileSync(file, 'utf-8');
  const items = JSON.parse(raw);
  for (const it of items) {
    await prisma.word.upsert({
      where: { id: it.id ?? 'nope-' + Math.random() },
      update: {},
      create: { he: it.he, en: it.en, topic: it.topic, level: it.level }
    });
  }
  console.log('Seeded', items.length, 'words');
}

main().then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1); });
