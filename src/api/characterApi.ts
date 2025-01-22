import {ApiType} from '../types/api';

export const fetchCharacters = async (): Promise<ApiType[]> => {
  const res = await fetch('/conanwiki/person.json');
  return res.json();
};

export const fetchCharacterDetail = async (
  id: number,
): Promise<ApiType | undefined> => {
  const res = await fetch('/conanwiki/person.json');
  const character: ApiType[] = await res.json();
  return character.find(item => item.id === id);
};

export const fetchCouple = async (): Promise<ApiType[]> => {
  const res = await fetch('/conanwiki/couple.json');
  return res.json();
};

export const fetchPersonEpisode = async (): Promise<ApiType[]> => {
  const res = await fetch('/conanwiki/personEpisodes.json');
  return res.json();
};
