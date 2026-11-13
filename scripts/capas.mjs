// Gera as versões WebP responsivas das capas (public/midia/capa-*.jpg).
// Cada capa vira capa-<nome>-480.webp até -1600.webp (480, 720, 960, 1280 e 1600 px), usadas no srcset
// dos cards e do player. O JPEG original continua sendo a imagem de compartilhamento (og:image).
// Uso: npm run capas
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const pasta = path.resolve('public/midia');
const larguras = [480, 720, 960, 1280, 1600];

const capas = (await readdir(pasta)).filter((arquivo) => /^capa-.+\.jpe?g$/i.test(arquivo));

for (const capa of capas) {
  const base = capa.replace(/\.jpe?g$/i, '');
  for (const largura of larguras) {
    const destino = path.join(pasta, `${base}-${largura}.webp`);
    await sharp(path.join(pasta, capa)).resize({ width: largura, withoutEnlargement: true }).webp({ quality: 78 }).toFile(destino);
    console.log(`${path.relative(process.cwd(), destino)}`);
  }
}
