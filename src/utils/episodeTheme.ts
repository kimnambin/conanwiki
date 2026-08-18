export type EpisodeLang = 'dub' | 'sub';

export interface EpisodeThemeInfo {
  accent: string;
  accentSoft: string;
  bgFrom: string;
  bgTo: string;
}

// 더빙판/자막판을 시각적으로 구분하기 위한 카드 테마.
export const EPISODE_THEME: Record<EpisodeLang, EpisodeThemeInfo> = {
  dub: {
    accent: '#00c2a8',
    accentSoft: 'rgba(0, 194, 168, 0.5)',
    bgFrom: '#0d2a26',
    bgTo: '#061412',
  },
  sub: {
    accent: '#e0a542',
    accentSoft: 'rgba(224, 165, 66, 0.5)',
    bgFrom: '#2c2210',
    bgTo: '#130f08',
  },
};

// 캐릭터별 에피소드 모음 카드의 테마 (더빙/자막과 구분되는 세 번째 톤).
export const CHARACTER_EPISODE_THEME: EpisodeThemeInfo = {
  accent: '#9b6bf2',
  accentSoft: 'rgba(155, 107, 242, 0.5)',
  bgFrom: '#231a37',
  bgTo: '#100b1c',
};
