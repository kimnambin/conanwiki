export const fetchCharacters = async () => {
  const res = await fetch('../person.json');
  return res.json();
};

export const fetchCharacterDetail = async id => {
  const res = await fetch('../person.json');
  const character = await res.json();
  return character.find(item => item.id === id);
};

export const fetchCouple = async () => {
  const res = await fetch('../couple.json');
  return res.json();
};

export const fetchPersonEpisode = async () => {
  const res = await fetch('../personEpisodes.json');
  return res.json();
};
