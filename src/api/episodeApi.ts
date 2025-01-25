import {EpisodeTypes} from '../types/api';

export const epicodefetch = async (): Promise<EpisodeTypes[]> => {
  const res = await fetch('/conanwiki/episodes.json');

  const data = await res.json();
  return data;
};
