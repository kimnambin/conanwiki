import {CharacherType} from '../types/api.model';
import {RelationshipCategoryKey} from '../types/relationship.model';

export interface RelationshipCategoryMeta {
  key: RelationshipCategoryKey;
  label: string;
  icon: string;
  color: string;
}

// 순서 = 관계도에서 12시 방향부터 시계방향으로 배치되는 순서.
export const RELATIONSHIP_CATEGORIES: RelationshipCategoryMeta[] = [
  {key: '가족', label: '가족', icon: '👪', color: '#f2a33c'},
  {key: '연인', label: '연인', icon: '💞', color: '#e0384a'},
  {key: '친구', label: '친구', icon: '🤝', color: '#3ecf6e'},
  {key: '동료', label: '동료', icon: '🧑‍🤝‍🧑', color: '#3d8bfd'},
  {key: '적', label: '적', icon: '⚔️', color: '#9096a3'},
];

export interface RelationshipEntry {
  raw: string;
  name: string;
  note: string | null;
  category: RelationshipCategoryKey;
  matched: CharacherType | null;
}

const NAME_NOTE_RE = /^(.*?)\s*\(([^)]*)\)\s*$/;

// "에도가와 코난 (보호자)" -> {name: "에도가와 코난", note: "보호자"}
export function parseRelationshipEntry(raw: string): {
  name: string;
  note: string | null;
} {
  const match = raw.match(NAME_NOTE_RE);
  if (!match) return {name: raw.trim(), note: null};
  const [, name, note] = match;
  return {name: name.trim(), note: note.trim() || null};
}

function namesOverlap(a: string, b: string): boolean {
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

// relationships 배열의 이름 표기(주로 원어 로마자 표기)와 name.korean.name
// 표기("한국판 닉네임 (원어 이름)")가 서로 다르므로 부분 일치로 찾는다.
// "쿠도 신이치 / 에도가와 코난"처럼 '/'로 병기된 경우도 각각 시도한다.
export function findMatchingCharacter(
  relationName: string,
  characters: CharacherType[],
  self?: CharacherType,
): CharacherType | null {
  const candidates = relationName
    .split('/')
    .map(part => part.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    const found = characters.find(
      c =>
        c !== self &&
        c.name.korean.name !== self?.name.korean.name &&
        namesOverlap(c.name.korean.name, candidate),
    );
    if (found) return found;
  }
  return null;
}

// 캐릭터 한 명의 relationships 데이터를, 카테고리 순서를 유지한 채
// 평평한 목록으로 펼치고 각 항목을 실제 캐릭터 레코드와 매칭한다.
export function buildRelationshipEntries(
  character: CharacherType,
  characters: CharacherType[],
): RelationshipEntry[] {
  const relationships = character.relationships;
  if (!relationships) return [];

  return RELATIONSHIP_CATEGORIES.flatMap(({key}) => {
    const list = relationships[key] ?? [];
    return list.map(raw => {
      const {name, note} = parseRelationshipEntry(raw);
      return {
        raw,
        name,
        note,
        category: key,
        matched: findMatchingCharacter(name, characters, character),
      };
    });
  });
}

export interface RelationshipNode extends RelationshipEntry {
  id: string;
  x: number;
  y: number;
}

export interface RelationshipLayout {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  nodes: RelationshipNode[];
}

const DEG_TO_RAD = Math.PI / 180;

// 카테고리별로 부채꼴 각도를 나누고, 각 부채꼴 안에서 항목을 고르게 펼치는
// 방사형(radial) 레이아웃. 항목이 많은 부채꼴은 두 겹의 반지름을 번갈아
// 써서 겹치지 않게 한다.
export function layoutRelationshipNodes(
  entries: RelationshipEntry[],
  options?: {
    width?: number;
    height?: number;
    innerRadius?: number;
    outerRadius?: number;
  },
): RelationshipLayout {
  const width = options?.width ?? 320;
  const height = options?.height ?? 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const innerRadius = options?.innerRadius ?? 92;
  const outerRadius = options?.outerRadius ?? 122;

  const activeCategories = RELATIONSHIP_CATEGORIES.filter(({key}) =>
    entries.some(entry => entry.category === key),
  );

  const nodes: RelationshipNode[] = [];
  const sectorAngle = 360 / Math.max(activeCategories.length, 1);

  activeCategories.forEach((category, categoryIndex) => {
    const items = entries.filter(entry => entry.category === category.key);
    const sectorCenter = -90 + categoryIndex * sectorAngle;
    // 부채꼴 폭의 70%만 써서 옆 카테고리와 여백을 둔다.
    const usableAngle = sectorAngle * 0.7;
    const step =
      items.length > 1 ? usableAngle / (items.length - 1) : 0;
    const startAngle = sectorCenter - usableAngle / 2;

    items.forEach((entry, itemIndex) => {
      const angle =
        items.length === 1 ? sectorCenter : startAngle + step * itemIndex;
      const radius = itemIndex % 2 === 0 ? innerRadius : outerRadius;
      const rad = angle * DEG_TO_RAD;
      nodes.push({
        ...entry,
        id: `${category.key}-${itemIndex}-${entry.name}`,
        x: centerX + radius * Math.cos(rad),
        y: centerY + radius * Math.sin(rad),
      });
    });
  });

  return {width, height, centerX, centerY, nodes};
}
