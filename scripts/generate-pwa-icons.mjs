import sharp from 'sharp';
import {mkdirSync} from 'node:fs';

const OUT_DIR = 'public/icons';
// 브라우저 탭 아이콘(Favicon, src/app/(site)/layout.tsx의 metadata.icons.icon)과
// 동일한 이미지를 PWA 아이콘 원본으로 쓴다.
const SOURCE = 'public/conanwiki/conanIcon_11zon.webp';
const CANVAS_BG = '#ffffff';

// 원본은 알파 채널 없이 흰색/연회색 배경이 구워져 있다.
// 가장자리에서 시작해 "밝고 채도 낮은" 픽셀만 투명하게 만들어 배경을 걷어낸다.
// (테두리에 닿지 않는 캐릭터 내부의 흰색 영역은 그대로 남는다.)
function isBackground(r, g, b) {
  return Math.min(r, g, b) >= 185 && Math.max(r, g, b) - Math.min(r, g, b) <= 25;
}

async function cutoutSource() {
  const {data, info} = await sharp(SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({resolveWithObject: true});
  const {width, height} = info;
  const visited = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    const idx = y * width + x;
    if (visited[idx]) return;
    const p = idx * 4;
    if (!isBackground(data[p], data[p + 1], data[p + 2])) return;
    visited[idx] = 1;
    stack.push(idx);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const idx = stack.pop();
    data[idx * 4 + 3] = 0;
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }

  return sharp(data, {raw: {width, height, channels: 4}}).png().toBuffer();
}

mkdirSync(OUT_DIR, {recursive: true});

async function makeIcon({file, size, padRatio}, character) {
  const contentSize = Math.round(size * (1 - padRatio * 2));
  const resized = await sharp(character)
    .trim()
    .resize(contentSize, contentSize, {
      fit: 'contain',
      background: {r: 0, g: 0, b: 0, alpha: 0},
      kernel: 'lanczos3',
    })
    .toBuffer();

  await sharp({
    create: {width: size, height: size, channels: 4, background: CANVAS_BG},
  })
    .composite([{input: resized, gravity: 'center'}])
    .png()
    .toFile(`${OUT_DIR}/${file}`);

  console.log('wrote', file);
}

const character = await cutoutSource();

await makeIcon({file: 'icon-192.png', size: 192, padRatio: 0.1}, character);
await makeIcon({file: 'icon-512.png', size: 512, padRatio: 0.1}, character);
await makeIcon({file: 'apple-touch-icon.png', size: 180, padRatio: 0.1}, character);
// Maskable: 핵심 콘텐츠를 안전 영역(중앙 ~80% 원) 안에 둔다.
await makeIcon({file: 'maskable-icon-512.png', size: 512, padRatio: 0.2}, character);
