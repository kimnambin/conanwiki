import {describe, expect, it} from 'vitest';
import {SpecialType} from '../types/api.model';
import {
  filterSpecialsByCategory,
  sortSpecialsByRelease,
} from './specialCategory';

const make = (
  slug: string,
  releaseDate: string,
  categories: SpecialType['categories'],
): SpecialType => ({
  slug,
  title: slug,
  categories,
  releaseDate,
  krInfo: null,
  runtime: 90,
  director: '',
  certification: null,
  overview: '',
  poster: '',
  characters: [],
  namuUrl: '',
});

const list = [
  make('b', '2016-12-10', ['TV 스페셜']),
  make('a', '2013-12-07', ['콜라보']),
  make('c', '2021-02-11', ['총집편', 'TV 스페셜']),
];

describe('sortSpecialsByRelease', () => {
  it('오름차순은 오래된 순, 내림차순은 최신순으로 정렬한다', () => {
    expect(sortSpecialsByRelease(list, 'asc').map(s => s.slug)).toEqual([
      'a',
      'b',
      'c',
    ]);
    expect(sortSpecialsByRelease(list, 'desc').map(s => s.slug)).toEqual([
      'c',
      'b',
      'a',
    ]);
  });

  it('원본 배열을 변경하지 않는다', () => {
    sortSpecialsByRelease(list, 'desc');
    expect(list.map(s => s.slug)).toEqual(['b', 'a', 'c']);
  });
});

describe('filterSpecialsByCategory', () => {
  it('분류가 null이면 전체를 반환한다', () => {
    expect(filterSpecialsByCategory(list, null)).toHaveLength(3);
  });

  it('여러 분류를 가진 항목은 각 분류에서 모두 나온다', () => {
    expect(filterSpecialsByCategory(list, 'TV 스페셜').map(s => s.slug)).toEqual([
      'b',
      'c',
    ]);
    expect(filterSpecialsByCategory(list, '총집편').map(s => s.slug)).toEqual([
      'c',
    ]);
    expect(filterSpecialsByCategory(list, '콜라보').map(s => s.slug)).toEqual([
      'a',
    ]);
  });
});
