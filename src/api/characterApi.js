export const fetchCharacters = async () => {
  const res = await fetch('../person.json');
  return res.json();
};

export const fetchCharacterDetail = async id => {
  const res = await fetch('../person.json');
  const character = await res.json();
  return character.find(item => item.id === id);
};
