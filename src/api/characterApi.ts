import axios from 'axios';
import {ApiType} from '../types/api.model';
import {EpiTypes} from '../types/component.model';

export const fetchCharacters = async (): Promise<ApiType[]> => {
  const res = await axios.get<ApiType[]>('/conanwiki/person.json');
  return res.data;
};

export const fetchCharacterDetail = async (
  id: number,
): Promise<ApiType | undefined> => {
  const {data: characters} = await axios.get<ApiType[]>(
    '/conanwiki/person.json',
  );
  return characters.find(item => item.id === id);
};

export const fetchCouple = async (): Promise<ApiType[]> => {
  const {data} = await axios.get<ApiType[]>('/conanwiki/couple.json');
  return data;
};

export const fetchPersonEpisode = async (): Promise<EpiTypes[]> => {
  const {data} = await axios.get<EpiTypes[]>('/conanwiki/personEpisodes.json');
  return data;
};
