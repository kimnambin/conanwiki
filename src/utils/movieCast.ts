import {CharacherType, MovieCastMember} from '../types/api.model';

const cleanCharacterName = (raw: string): string =>
  raw
    .replace(/\(voice\)/gi, '')
    .trim()
    .toLowerCase();

// TMDB 성우 크레딧의 character 필드는 일본어 로마자 이름(예: "Ran Mouri")을
// 쓰는데, 로컬 person.json은 영어 더빙명(name.english.anime, 예: "Rachel
// Moore")과 일본어 로마자명(name.japanese.romanized)을 함께 갖고 있어서
// 두 필드를 모두 후보로 비교해야 한다.
export function matchLocalCharacters(
  cast: MovieCastMember[],
  characters: CharacherType[],
): CharacherType[] {
  const matched: CharacherType[] = [];
  const seen = new Set<string>();

  for (const member of cast) {
    const target = cleanCharacterName(member.character);
    if (!target) continue;

    const found = characters.find(c => {
      const candidates = [
        c.name.english.anime,
        c.name.japanese?.romanized,
      ].filter((v): v is string => Boolean(v));
      return candidates.some(v => v.trim().toLowerCase() === target);
    });
    if (found && !seen.has(found.name.english.anime)) {
      seen.add(found.name.english.anime);
      matched.push(found);
    }
  }

  return matched;
}
