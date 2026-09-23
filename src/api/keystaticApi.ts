import 'server-only';
import {createReader} from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';
import {CharacterType, CoupleType} from '../types/api.model';

const reader = createReader(process.cwd(), keystaticConfig);

export const fetchCharacters = async (): Promise<CharacterType[]> => {
  const entries = await reader.collections.characters.all();
  return entries.map(c => c.entry) as unknown as CharacterType[];
};

export const fetchCouples = async (): Promise<CoupleType[]> => {
  const entries = await reader.collections.couples.all();
  return entries.map(c => c.entry) as unknown as CoupleType[];
};
