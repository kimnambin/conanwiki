import {describe, expect, it} from 'vitest';
import {getInitial, OTHER_INITIAL} from './koreanInitial';

describe('getInitial', () => {
  it('한글 음절의 초성을 반환한다', () => {
    expect(getInitial('고난')).toBe('ㄱ');
    expect(getInitial('나츠키')).toBe('ㄴ');
    expect(getInitial('하이바라 아이')).toBe('ㅎ');
    expect(getInitial('힣')).toBe('ㅎ');
    expect(getInitial('가')).toBe('ㄱ');
  });

  it('쌍자음은 대표 자음으로 묶는다', () => {
    expect(getInitial('까마귀')).toBe('ㄱ');
    expect(getInitial('따라')).toBe('ㄷ');
    expect(getInitial('빠르다')).toBe('ㅂ');
    expect(getInitial('쌍둥이')).toBe('ㅅ');
    expect(getInitial('짜장')).toBe('ㅈ');
  });

  it('앞뒤 공백은 무시한다', () => {
    expect(getInitial('  모리 란')).toBe('ㅁ');
  });

  it('한글이 아니거나 비어 있으면 기타로 분류한다', () => {
    expect(getInitial('??')).toBe(OTHER_INITIAL);
    expect(getInitial('Conan')).toBe(OTHER_INITIAL);
    expect(getInitial('')).toBe(OTHER_INITIAL);
  });
});
