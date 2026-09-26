import {describe, expect, it} from 'vitest';
import {CharacterType} from '../types/api.model';
import {characterKey, findSpecialCharacters} from './specialCast';

const make = (anime: string): CharacterType =>
  ({name: {korean: {name: anime}, english: {anime}}}) as CharacterType;

describe('characterKey', () => {
  it('부가 표기를 잘라 첫 이름만 키로 쓴다', () => {
    expect(
      characterKey(make('Vi Graythorn <small>(movies)</small><br>Anita Hailey')),
    ).toBe('Vi Graythorn');
    expect(characterKey(make('Eva Kadan (anime)<br />Eva Kaden (manga)'))).toBe(
      'Eva Kadan',
    );
    expect(characterKey(make('Conan Edogawa'))).toBe('Conan Edogawa');
  });
});

describe('findSpecialCharacters', () => {
  const chars = [
    make('Conan Edogawa'),
    make('Vi Graythorn <small>(movies)</small>'),
    make('Kaito Kuroba'),
  ];

  it('키 목록 순서대로 로컬 캐릭터를 찾고 없는 키는 건너뛴다', () => {
    const found = findSpecialCharacters(
      ['Vi Graythorn', 'Nobody', 'Conan Edogawa'],
      chars,
    );
    expect(found.map(characterKey)).toEqual(['Vi Graythorn', 'Conan Edogawa']);
  });
});
