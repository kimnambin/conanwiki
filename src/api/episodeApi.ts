import {EpisodeTypes} from '../types/api.model';
import axios from 'axios';

export const epicodefetch = async (): Promise<EpisodeTypes[]> => {
  const res = await axios.get<EpisodeTypes[]>('/conanwiki/episodes.json');

  return res.data;
};
