import {describe, expect, it} from 'vitest';
import {CharacherType} from '../types/api.model';
import {
  buildRelationshipEntries,
  findMatchingCharacter,
  layoutRelationshipNodes,
  parseRelationshipEntry,
  RELATIONSHIP_CATEGORIES,
} from './relationshipGraph';

function makeCharacter(
  koreanName: string,
  overrides: Partial<CharacherType> = {},
): CharacherType {
  return {
    name: {
      korean: {name: koreanName},
      english: {anime: koreanName},
    },
    img: '',
    occupation: '',
    age: '??',
    first_appearance: {anime: '??'},
    aliases: '??',
    ...overrides,
  };
}

describe('parseRelationshipEntry', () => {
  it('이름과 괄호 안 설명을 분리한다', () => {
    expect(parseRelationshipEntry('에도가와 코난 (보호자)')).toEqual({
      name: '에도가와 코난',
      note: '보호자',
    });
  });

  it('괄호가 없으면 note는 null이다', () => {
    expect(parseRelationshipEntry('에도가와 코난')).toEqual({
      name: '에도가와 코난',
      note: null,
    });
  });

  it('빈 괄호는 note를 null로 취급한다', () => {
    expect(parseRelationshipEntry('검은 조직 전원 ()')).toEqual({
      name: '검은 조직 전원',
      note: null,
    });
  });
});

describe('findMatchingCharacter', () => {
  const conan = makeCharacter('코난 (에도가와 코난)');
  const ran = makeCharacter('모란 (모리 란)');
  const characters = [conan, ran];

  it('한국판 닉네임에 원어 이름이 포함되어 있으면 매칭한다', () => {
    expect(findMatchingCharacter('에도가와 코난', characters)).toBe(conan);
  });

  it("'/'로 병기된 이름 중 하나라도 맞으면 매칭한다", () => {
    expect(
      findMatchingCharacter('쿠도 신이치 / 에도가와 코난', characters),
    ).toBe(conan);
  });

  it('자기 자신은 후보에서 제외한다', () => {
    expect(findMatchingCharacter('에도가와 코난', characters, conan)).toBeNull();
  });

  it('매칭되는 캐릭터가 없으면 null을 반환한다', () => {
    expect(findMatchingCharacter('검은 조직 전원', characters)).toBeNull();
  });
});

describe('buildRelationshipEntries', () => {
  it('카테고리 순서를 유지하며 항목을 펼치고 매칭 결과를 채운다', () => {
    const conan = makeCharacter('코난 (에도가와 코난)');
    const agasa = makeCharacter('브라운 (아가사 히로시)', {
      relationships: {
        친구: ['에도가와 코난 (보호자)', '하이바라 아이 (동료)'],
      },
    });

    const entries = buildRelationshipEntries(agasa, [conan, agasa]);

    expect(entries).toHaveLength(2);
    expect(entries[0]).toMatchObject({
      name: '에도가와 코난',
      note: '보호자',
      category: '친구',
      matched: conan,
    });
    expect(entries[1].matched).toBeNull();
  });

  it('relationships가 없으면 빈 배열을 반환한다', () => {
    expect(buildRelationshipEntries(makeCharacter('무명'), [])).toEqual([]);
  });
});

describe('layoutRelationshipNodes', () => {
  it('등장하는 카테고리 수만큼 부채꼴로 나누고 모든 항목에 좌표를 부여한다', () => {
    const entries = [
      {
        raw: 'a',
        name: 'a',
        note: null,
        category: '가족' as const,
        matched: null,
      },
      {
        raw: 'b',
        name: 'b',
        note: null,
        category: '적' as const,
        matched: null,
      },
    ];

    const layout = layoutRelationshipNodes(entries, {width: 320, height: 300});

    expect(layout.nodes).toHaveLength(2);
    expect(layout.centerX).toBeCloseTo(160);
    expect(layout.centerY).toBeCloseTo(150);
    layout.nodes.forEach(node => {
      expect(Number.isFinite(node.x)).toBe(true);
      expect(Number.isFinite(node.y)).toBe(true);
    });
  });

  it('빈 입력에 대해 빈 노드 목록을 반환한다', () => {
    expect(layoutRelationshipNodes([]).nodes).toEqual([]);
  });

  it('카테고리 메타는 정의된 5개를 모두 포함한다', () => {
    expect(RELATIONSHIP_CATEGORIES.map(c => c.key)).toEqual([
      '가족',
      '연인',
      '친구',
      '동료',
      '적',
    ]);
  });
});
