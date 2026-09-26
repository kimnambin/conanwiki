import {SpecialCategory, SpecialType} from '../types/api.model';

export const SPECIAL_CATEGORIES: SpecialCategory[] = [
  '콜라보',
  'TV 스페셜',
  '총집편',
];

// 카드 좌상단 뱃지에 쓰는 분류별 아이콘.
export const SPECIAL_CATEGORY_ICON: Record<SpecialCategory, string> = {
  콜라보: '🤝',
  'TV 스페셜': '📺',
  총집편: '🎞️',
};

export type SpecialOrder = 'asc' | 'desc';

// 일본 최초 공개일(releaseDate) 기준 정렬. 원본 배열은 건드리지 않는다.
export function sortSpecialsByRelease(
  specials: SpecialType[],
  order: SpecialOrder,
): SpecialType[] {
  const sign = order === 'asc' ? 1 : -1;
  return [...specials].sort(
    (a, b) =>
      sign * (new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()),
  );
}

export function filterSpecialsByCategory(
  specials: SpecialType[],
  category: SpecialCategory | null,
): SpecialType[] {
  if (!category) return specials;
  return specials.filter(s => s.categories.includes(category));
}
