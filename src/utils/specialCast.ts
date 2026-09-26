import {CharacterType} from '../types/api.model';

// 캐릭터 JSON의 name.english.anime에는 "Vi Graythorn <small>(movies)</small>..."처럼
// 부가 표기가 붙어 있는 경우가 있어, 첫 이름만 잘라 식별 키로 쓴다.
export function characterKey(character: CharacterType): string {
  return character.name.english.anime.split(/ <| \(|<br/)[0].trim();
}

// specials.json의 characters(키 목록)에 해당하는 로컬 캐릭터를 목록 순서대로 반환한다.
export function findSpecialCharacters(
  keys: string[],
  characters: CharacterType[],
): CharacterType[] {
  const byKey = new Map(characters.map(c => [characterKey(c), c]));
  return keys.flatMap(key => {
    const found = byKey.get(key);
    return found ? [found] : [];
  });
}
