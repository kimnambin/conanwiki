export interface CoupleTypeInfo {
  key: string;
  label: string;
  icon: string;
  description: string;
  accent: string;
  accentSoft: string;
  bgFrom: string;
  bgTo: string;
}

// relationship_type 문구를 카드 배경/뱃지에 쓰는 몇 가지 타입으로 묶는다.
// 위에서부터 우선순위 순으로 매칭.
const TYPE_RULES: {
  key: string;
  match: (relationship: string) => boolean;
  info: Omit<CoupleTypeInfo, 'key'>;
}[] = [
  {
    key: 'separated',
    match: r => r.includes('별거'),
    info: {
      label: '별거 중',
      icon: '🌧️',
      description: '부부이지만 현재 따로 지내고 있는 관계예요.',
      accent: '#7c8591',
      accentSoft: 'rgba(124, 133, 145, 0.5)',
      bgFrom: '#262a30',
      bgTo: '#101215',
    },
  },
  {
    key: 'deceased',
    match: r => r.includes('사별'),
    info: {
      label: '사별',
      icon: '🕊️',
      description: '한쪽이 세상을 떠나 더 이상 함께하지 못하는 관계예요.',
      accent: '#5b7c99',
      accentSoft: 'rgba(91, 124, 153, 0.5)',
      bgFrom: '#182530',
      bgTo: '#0a1015',
    },
  },
  {
    key: 'unofficial',
    match: r => r.includes('비공식'),
    info: {
      label: '비공식 연인',
      icon: '🤫',
      description: '서로 호감은 있지만 아직 공식적으로 밝혀지지 않은 관계예요.',
      accent: '#9b6bf2',
      accentSoft: 'rgba(155, 107, 242, 0.5)',
      bgFrom: '#231a37',
      bgTo: '#100b1c',
    },
  },
  {
    key: 'married',
    match: r => r.includes('부부'),
    info: {
      label: '부부',
      icon: '💍',
      description: '혼인하여 부부가 된 관계예요.',
      accent: '#d4af37',
      accentSoft: 'rgba(212, 175, 55, 0.5)',
      bgFrom: '#332c12',
      bgTo: '#16130a',
    },
  },
  {
    key: 'dating',
    match: r => r.includes('연인'),
    info: {
      label: '연인',
      icon: '💕',
      description: '서로 마음을 확인하고 사귀는 사이예요.',
      accent: '#e0507a',
      accentSoft: 'rgba(224, 80, 122, 0.5)',
      bgFrom: '#33121e',
      bgTo: '#15070c',
    },
  },
];

export const ETC_COUPLE_TYPE: CoupleTypeInfo = {
  key: 'etc',
  label: '관계',
  icon: '❓',
  description: '아직 확인된 관계 정보가 없어요.',
  accent: '#8a8f98',
  accentSoft: 'rgba(138, 143, 152, 0.45)',
  bgFrom: '#24262b',
  bgTo: '#101114',
};

export const COUPLE_TYPES: CoupleTypeInfo[] = [
  ...TYPE_RULES.map(rule => ({key: rule.key, ...rule.info})),
  ETC_COUPLE_TYPE,
];

export function getCoupleType(
  relationshipType: string | undefined,
): CoupleTypeInfo {
  const relationship = relationshipType ?? '';
  if (relationship === '') return ETC_COUPLE_TYPE;
  const rule = TYPE_RULES.find(r => r.match(relationship));
  return rule ? {key: rule.key, ...rule.info} : ETC_COUPLE_TYPE;
}
