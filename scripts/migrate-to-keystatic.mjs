/**
 * 기존 src/data/person.json, couple.json을
 * Keystatic content 디렉토리로 분리하는 1회성 마이그레이션 스크립트
 *
 * 실행: node scripts/migrate-to-keystatic.mjs
 */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, '');
}

function toSlug(str) {
  return stripHtml(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true});
  }
}

/** 이미 마이그레이션된 콘텐츠를 재실행으로 덮어쓰지 않도록 보호 */
function assertNotAlreadyMigrated(destDir, label) {
  if (fs.existsSync(destDir) && fs.readdirSync(destDir).length > 0) {
    console.error(
      `❌ ${destDir}에 이미 ${label} 콘텐츠가 있습니다. 이 스크립트는 1회성 마이그레이션 전용이며,` +
        ` 재실행 시 Keystatic CMS에서 수정한 내용을 덮어씁니다. 필요하다면 --force로 강제 실행하세요.`
    );
    process.exit(1);
  }
}

// ─── 캐릭터 마이그레이션 ──────────────────────────────────────────────
function migrateCharacters(force) {
  const srcPath = path.join(ROOT, 'src/data/person.json');
  const destDir = path.join(ROOT, 'src/content/characters');
  if (!force) assertNotAlreadyMigrated(destDir, '캐릭터');
  ensureDir(destDir);

  const characters = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
  let count = 0;

  for (const char of characters) {
    const rawDisplayName = char.name?.english?.anime ?? 'unknown';
    const displayName = stripHtml(rawDisplayName);
    const slug = toSlug(rawDisplayName);

    if (!slug) {
      console.warn(`⚠️  슬러그 생성 실패: ${JSON.stringify(char.name)}`);
      continue;
    }

    const destPath = path.join(destDir, `${slug}.json`);

    const keystatic = {
      ...char,
      // fields.slug()는 JSON에 표시용 이름(문자열)만 저장, 슬러그는 파일명에서 파생
      // (HTML 마크업은 제거 — name.english.anime 원본은 검색/매칭용으로 그대로 유지)
      englishName: displayName,
      age: char.age != null ? String(char.age) : '',
      // 숫자가 아닌 keyhole값("??" 등)은 null로 변환 (fields.integer 스키마 대응)
      keyhole: typeof char.keyhole === 'number' ? char.keyhole : null,
    };

    fs.writeFileSync(destPath, JSON.stringify(keystatic, null, 2), 'utf-8');
    count++;
  }

  console.log(`✅ 캐릭터 ${count}개 → src/content/characters/`);
}

// ─── 커플 마이그레이션 ──────────────────────────────────────────────
function migrateCouples(force) {
  const srcPath = path.join(ROOT, 'src/data/couple.json');
  const destDir = path.join(ROOT, 'src/content/couples');
  if (!force) assertNotAlreadyMigrated(destDir, '커플');
  ensureDir(destDir);

  const couples = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
  let count = 0;

  for (let i = 0; i < couples.length; i++) {
    const couple = couples[i];
    const nickname = couple.couple_nickname ?? `커플 ${i + 1}`;
    // 한국어 닉네임은 ASCII slug로 변환 불가 → 인덱스 기반 슬러그 사용
    const asciiSlug = toSlug(nickname);
    const slug = asciiSlug || `couple-${String(i + 1).padStart(2, '0')}`;

    const destPath = path.join(destDir, `${slug}.json`);

    const keystatic = {
      ...couple,
      couple_nickname: nickname,
    };

    fs.writeFileSync(destPath, JSON.stringify(keystatic, null, 2), 'utf-8');
    count++;
  }

  console.log(`✅ 커플 ${count}개 → src/content/couples/`);
}

const force = process.argv.includes('--force');
migrateCharacters(force);
migrateCouples(force);
console.log('\n마이그레이션 완료. 이제 npm run dev 후 /keystatic 에서 편집하세요.');
