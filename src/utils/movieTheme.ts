export interface MovieThemeInfo {
  accent: string;
  accentSoft: string;
  bgFrom: string;
  bgTo: string;
}

// 극장판 카드 전용 테마 (분류가 없는 단일 톤이라 하나만 둔다).
export const MOVIE_THEME: MovieThemeInfo = {
  accent: '#00c2a8',
  accentSoft: 'rgba(0, 194, 168, 0.5)',
  bgFrom: '#0d2a26',
  bgTo: '#061412',
};
