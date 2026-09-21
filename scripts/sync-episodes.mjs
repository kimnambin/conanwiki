/**
 * Jikan API(MyAnimeList 기반)에서 코난 에피소드를 가져와
 * src/data/episodes-raw.json을 최신 상태로 유지하는 스크립트
 *
 * 실행: node scripts/sync-episodes.mjs
 * GitHub Actions에서 주간 자동 실행 (.github/workflows/sync-episodes.yml)
 *
 * Jikan API: https://jikan.moe/  (무료, 인증 불필요)
 * 코난 MAL ID: 235
 */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONAN_MAL_ID = 235;
const RAW_OUTPUT = path.join(ROOT, 'src/data/episodes-raw.json');

/** Jikan API rate limit: 3 req/s, 60 req/min */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPage(page) {
  const url = `https://api.jikan.moe/v4/anime/${CONAN_MAL_ID}/episodes?page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Jikan API 오류: ${res.status} (page ${page})`);
  return res.json();
}

/** 전체 에피소드 페이지를 순서대로 수집 */
async function fetchAllEpisodes() {
  const first = await fetchPage(1);
  const totalPages = first.pagination.last_visible_page;
  const all = [...first.data];

  for (let page = 2; page <= totalPages; page++) {
    await sleep(400); // rate limit 준수
    const data = await fetchPage(page);
    all.push(...data.data);
    process.stdout.write(`  페이지 ${page}/${totalPages} 수집 중...\r`);
  }

  return all;
}

/** Jikan 에피소드 객체 → 저장 형식으로 변환 */
function normalizeEpisode(ep) {
  return {
    mal_id: ep.mal_id,
    title: ep.title ?? null,
    title_japanese: ep.title_japanese ?? null,
    title_romanji: ep.title_romanji ?? null,
    aired: ep.aired ?? null,
    filler: ep.filler ?? false,
    recap: ep.recap ?? false,
    url: ep.url ?? null,
  };
}

function mergeWithExisting(newEpisodes) {
  if (!fs.existsSync(RAW_OUTPUT)) return newEpisodes;

  const existing = JSON.parse(fs.readFileSync(RAW_OUTPUT, 'utf-8'));
  const existingIds = new Set(existing.map(ep => ep.mal_id));
  const added = newEpisodes.filter(ep => !existingIds.has(ep.mal_id));

  return [...existing, ...added].sort((a, b) => a.mal_id - b.mal_id);
}

async function main() {
  console.log('🔍 Jikan API에서 코난 에피소드 수집 중...');
  const raw = await fetchAllEpisodes();
  const episodes = raw.map(normalizeEpisode);
  const merged = mergeWithExisting(episodes);

  const prevCount = fs.existsSync(RAW_OUTPUT)
    ? JSON.parse(fs.readFileSync(RAW_OUTPUT, 'utf-8')).length
    : 0;

  fs.writeFileSync(RAW_OUTPUT, JSON.stringify(merged, null, 2), 'utf-8');

  const added = merged.length - prevCount;
  console.log(`\n✅ 총 ${merged.length}화 저장 완료 → src/data/episodes-raw.json`);
  if (added > 0) console.log(`   📺 신규 ${added}화 추가됨`);
}

main().catch(err => {
  console.error('❌ 동기화 실패:', err.message);
  process.exit(1);
});
