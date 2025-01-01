export const fetchCharacters = async () => {
  const res = await fetch('/conanwiki/person.json');
  return res.json();
};

export const fetchCharacterDetail = async id => {
  const res = await fetch('/conanwiki/person.json');
  const character = await res.json();
  return character.find(item => item.id === id);
};

export const fetchCouple = async () => {
  const res = await fetch('/conanwiki/couple.json');
  return res.json();
};

export const fetchPersonEpisode = async () => {
  const res = await fetch('/conanwiki/personEpisodes.json');
  return res.json();
};
