export interface CharacterTypeInfo {
  key: string;
  label: string;
  icon: string;
  description: string;
  accent: string;
  accentSoft: string;
  bgFrom: string;
  bgTo: string;
}

// 하스스톤 영웅 클래스처럼, 소속을 몇 가지 큰 "타입"으로 묶어
// 카드 배경 톤 / 원형 뱃지 색으로 사용한다. 위에서부터 우선순위 순으로 매칭.
const TYPE_RULES: {
  key: string;
  match: (affiliations: string[]) => boolean;
  info: Omit<CharacterTypeInfo, 'key'>;
}[] = [
  {
    key: 'blackOrg',
    match: aff => aff.some(a => a.includes('검은 조직')),
    info: {
      label: '검은 조직',
      icon: '🥃',
      description: '작중 최대의 비밀 범죄 조직이에요. 위장 신분으로 활동 중인 캐릭터도 여기에 포함돼요.',
      accent: '#e0384a',
      accentSoft: 'rgba(224, 56, 74, 0.55)',
      bgFrom: '#2a1015',
      bgTo: '#120708',
    },
  },
  {
    key: 'detectiveBoys',
    match: aff => aff.some(a => a.includes('소년탐정단')),
    info: {
      label: '소년탐정단',
      icon: '🔍',
      description: '코난과 친구들이 결성한 어린이 탐정단, 그리고 그 주변 인물들이에요.',
      accent: '#f2a33c',
      accentSoft: 'rgba(242, 163, 60, 0.55)',
      bgFrom: '#3a2711',
      bgTo: '#181008',
    },
  },
  {
    key: 'thief',
    match: aff =>
      aff.some(
        a =>
          a.includes('괴도 키드') ||
          a.includes('루팡 일당') ||
          a.includes('매직 카이토'),
      ),
    info: {
      label: '괴도',
      icon: '🎩',
      description: '괴도 키드와 루팡 일당 등, 괴도와 관련된 인물들이에요.',
      accent: '#9b6bf2',
      accentSoft: 'rgba(155, 107, 242, 0.55)',
      bgFrom: '#231a37',
      bgTo: '#100b1c',
    },
  },
  {
    key: 'international',
    match: aff => aff.some(a => a.includes('FBI') || a.includes('CIA')),
    info: {
      label: '국제기관',
      icon: '🕶️',
      description: 'FBI, CIA 등 국제 수사기관 소속 인물들이에요.',
      accent: '#d4af37',
      accentSoft: 'rgba(212, 175, 55, 0.55)',
      bgFrom: '#332c12',
      bgTo: '#16130a',
    },
  },
  {
    key: 'police',
    match: aff =>
      aff.some(
        a =>
          a.includes('경시청') ||
          a.includes('경찰') ||
          a.includes('공안부') ||
          a.includes('검찰'),
      ),
    info: {
      label: '경찰/수사기관',
      icon: '🚓',
      description: '경시청, 검찰 등 일본 공권력 소속 인물들이에요.',
      accent: '#3d8bfd',
      accentSoft: 'rgba(61, 139, 253, 0.5)',
      bgFrom: '#13233d',
      bgTo: '#0a111d',
    },
  },
  {
    key: 'school',
    match: aff =>
      aff.some(a => a.includes('초등학교') || a.includes('고등학교')),
    info: {
      label: '학교',
      icon: '🎒',
      description: '초등학교, 고등학교 등 학교에 재학 중인 학생 신분의 인물들이에요.',
      accent: '#3ecf6e',
      accentSoft: 'rgba(62, 207, 110, 0.5)',
      bgFrom: '#12301d',
      bgTo: '#08150d',
    },
  },
  {
    key: 'agency',
    match: aff =>
      aff.some(a => a.includes('탐정 사무소') || a.includes('법률 사무소')),
    info: {
      label: '탐정/법률 사무소',
      icon: '🕵️',
      description: '모리 탐정 사무소, 키사키 법률 사무소 등 소속 인물들이에요.',
      accent: '#2bbfae',
      accentSoft: 'rgba(43, 191, 174, 0.5)',
      bgFrom: '#0f2e2c',
      bgTo: '#081615',
    },
  },
  {
    key: 'business',
    match: aff => aff.length > 0,
    info: {
      label: '기업/기타',
      icon: '🏢',
      description: '기업이나 그 외 단체에 소속된 인물들이에요.',
      accent: '#c9a227',
      accentSoft: 'rgba(201, 162, 39, 0.5)',
      bgFrom: '#2c2413',
      bgTo: '#141008',
    },
  },
];

export const NONE_TYPE: CharacterTypeInfo = {
  key: 'none',
  label: '무소속',
  icon: '❓',
  description: '확인된 소속 정보가 아직 없어요.',
  accent: '#8a8f98',
  accentSoft: 'rgba(138, 143, 152, 0.45)',
  bgFrom: '#24262b',
  bgTo: '#101114',
};

export const CHARACTER_TYPES: CharacterTypeInfo[] = [
  ...TYPE_RULES.map(rule => ({key: rule.key, ...rule.info})),
  NONE_TYPE,
];

export function getCharacterType(
  affiliation: string[] | undefined,
): CharacterTypeInfo {
  const aff = affiliation ?? [];
  if (aff.length === 0) return NONE_TYPE;
  const rule = TYPE_RULES.find(r => r.match(aff));
  return rule ? {key: rule.key, ...rule.info} : NONE_TYPE;
}
