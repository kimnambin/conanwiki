import type {Metadata} from 'next';
import EpisodeBrowser from '../../component/episode/EpisodeBrowser';
import episodesDubData from '../../data/episodes.json';
import episodesSubData from '../../data/episodes-japan.json';
import personEpisodesData from '../../data/personEpisodes.json';
import {EpisodeTypes} from '../../types/api.model';
import {EpiTypes} from '../../types/component.model';

export const metadata: Metadata = {
  title: '에피소드',
  description:
    '명탐정 코난 더빙판/자막판 중요 에피소드와 캐릭터별 출연 에피소드를 정리했어요.',
};

export default function EpisodesPage() {
  const episodesDub = episodesDubData as unknown as EpisodeTypes[];
  const episodesSub = episodesSubData as unknown as EpisodeTypes[];
  const personEpisodes = personEpisodesData as unknown as EpiTypes[];

  return (
    <EpisodeBrowser
      episodesDub={episodesDub}
      episodesSub={episodesSub}
      personEpisodes={personEpisodes}
    />
  );
}
