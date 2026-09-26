// 한글 초성(ㄱ ㄴ ㄷ ...) 필터용 유틸.
// 쌍자음(ㄲ, ㄸ, ㅃ, ㅆ, ㅉ)은 대표 자음(ㄱ, ㄷ, ㅂ, ㅅ, ㅈ)에 묶어 버튼 수를 줄인다.

export const OTHER_INITIAL = '기타';

export const INITIALS = [
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

// 유니코드 한글 음절(가~힣)의 초성 순서.
const CHOSEONG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

const TENSE_TO_BASE: Record<string, string> = {
  ㄲ: 'ㄱ',
  ㄸ: 'ㄷ',
  ㅃ: 'ㅂ',
  ㅆ: 'ㅅ',
  ㅉ: 'ㅈ',
};

const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;
const SYLLABLES_PER_CHOSEONG = 588; // 21 중성 * 28 종성

// 이름의 첫 글자에서 초성 버튼 값을 구한다. 한글이 아니면 '기타'.
export function getInitial(name: string): string {
  const first = name.trim().charAt(0);
  if (!first) return OTHER_INITIAL;

  const code = first.charCodeAt(0);
  let consonant = first;
  if (code >= HANGUL_START && code <= HANGUL_END) {
    consonant =
      CHOSEONG[Math.floor((code - HANGUL_START) / SYLLABLES_PER_CHOSEONG)];
  }

  const base = TENSE_TO_BASE[consonant] ?? consonant;
  return (INITIALS as readonly string[]).includes(base) ? base : OTHER_INITIAL;
}
