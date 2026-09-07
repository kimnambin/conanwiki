import sharp from 'sharp';
import {mkdirSync} from 'node:fs';

const OUT_DIR = 'public/icons';
const BRAND = '#00a495';

// Same glyph as the navbar brand mark (react-icons/gi GiMagnifyingGlass),
// so the installed app icon matches the site's own logo instead of relying
// on a (transparency-corrupted) fan-art crop.
const GLYPH_PATH =
  'M333.78 20.188c-39.97 0-79.96 15.212-110.405 45.656-58.667 58.667-60.796 152.72-6.406 213.97l-15.782 15.748 13.25 13.25 15.75-15.78c61.248 54.39 155.3 52.26 213.968-6.407 60.887-60.886 60.888-159.894 0-220.78C413.713 35.4 373.753 20.187 333.78 20.187zm0 18.562c35.15 0 70.285 13.44 97.158 40.313 53.745 53.745 53.744 140.6 0 194.343-51.526 51.526-133.46 53.643-187.5 6.375l.218-.217c-2.35-2.05-4.668-4.17-6.906-6.407-2.207-2.206-4.288-4.496-6.313-6.812l-.218.22c-47.27-54.04-45.152-135.976 6.374-187.502C263.467 52.19 298.63 38.75 333.78 38.75zm0 18.813c-30.31 0-60.63 11.6-83.81 34.78-46.362 46.362-46.362 121.234 0 167.594 10.14 10.142 21.632 18.077 33.905 23.782-24.91-19.087-40.97-49.133-40.97-82.94 0-15.323 3.292-29.888 9.22-43-4.165 20.485.44 40.88 14.47 54.907 24.583 24.585 68.744 20.318 98.624-9.562 29.88-29.88 34.146-74.04 9.56-98.625-2.375-2.376-4.943-4.473-7.655-6.313 45.13 8.648 79.954 46.345 84.25 92.876 4.44-35.07-6.82-71.726-33.813-98.72-23.18-23.18-53.47-34.78-83.78-34.78zM176.907 297.688L42.094 432.5l34.562 34.563L211.47 332.25l-34.564-34.563zM40 456.813L24 472.78 37.22 486l15.968-16L40 456.812z';

mkdirSync(OUT_DIR, {recursive: true});

function glyphSvg(fill) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="${GLYPH_PATH}" fill="${fill}"/></svg>`,
  );
}

async function trimmedGlyph(fill) {
  const rendered = await sharp(glyphSvg(fill), {density: 384})
    .png()
    .toBuffer();
  return sharp(rendered).trim().png().toBuffer();
}

async function makeIcon({file, size, padRatio, canvasBg, glyphFill}) {
  const glyph = await trimmedGlyph(glyphFill);
  const contentSize = Math.round(size * (1 - padRatio * 2));
  const resizedGlyph = await sharp(glyph)
    .resize(contentSize, contentSize, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}})
    .toBuffer();

  await sharp({create: {width: size, height: size, channels: 4, background: canvasBg}})
    .composite([{input: resizedGlyph, gravity: 'center'}])
    .png()
    .toFile(`${OUT_DIR}/${file}`);

  console.log('wrote', file);
}

await makeIcon({file: 'icon-192.png', size: 192, padRatio: 0.24, canvasBg: BRAND, glyphFill: '#ffffff'});
await makeIcon({file: 'icon-512.png', size: 512, padRatio: 0.24, canvasBg: BRAND, glyphFill: '#ffffff'});
await makeIcon({file: 'apple-touch-icon.png', size: 180, padRatio: 0.22, canvasBg: BRAND, glyphFill: '#ffffff'});
// Maskable: keep all meaningful content inside the ~80% safe-zone circle.
await makeIcon({file: 'maskable-icon-512.png', size: 512, padRatio: 0.32, canvasBg: BRAND, glyphFill: '#ffffff'});
