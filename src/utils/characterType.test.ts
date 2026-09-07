import {describe, expect, it} from 'vitest';
import {getCharacterType, NONE_TYPE} from './characterType';

describe('getCharacterType', () => {
  it('소속이 없으면 무소속을 반환한다', () => {
    expect(getCharacterType(undefined)).toEqual(NONE_TYPE);
    expect(getCharacterType([])).toEqual(NONE_TYPE);
  });

  it('검은 조직을 최우선으로 매칭한다', () => {
    const type = getCharacterType(['소년탐정단', '검은 조직']);
    expect(type.key).toBe('blackOrg');
  });

  it('괴도 키드/루팡 일당/매직 카이토를 괴도 타입으로 매칭한다', () => {
    expect(getCharacterType(['괴도 키드']).key).toBe('thief');
    expect(getCharacterType(['루팡 일당']).key).toBe('thief');
    expect(getCharacterType(['매직 카이토']).key).toBe('thief');
  });

  it('경시청/검찰 등은 경찰 타입으로 매칭한다', () => {
    expect(getCharacterType(['경시청 수사1과']).key).toBe('police');
    expect(getCharacterType(['오사카부 검찰청']).key).toBe('police');
  });

  it('어떤 규칙에도 안 걸리면서 소속이 있으면 기업/기타로 떨어진다', () => {
    expect(getCharacterType(['이름 모를 회사']).key).toBe('business');
  });
});
