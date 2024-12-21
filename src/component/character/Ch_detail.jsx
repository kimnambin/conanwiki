import Modal from 'react-modal';

// Modal.setAppElement('#root');

export default function Ch_detail({open, close, character}) {
  if (!open) return null;

  return (
    <div>
      <h2>{character.name.english.anime}</h2>
      <p>Occupation: {character.occupation}</p>
      <p>Age: {character.age}</p>
      <p>First Appearance: {character.first_appearance.anime}</p>
      <p>Aliases: {character.aliases}</p>
      <button onClick={close}>Close</button>
    </div>
  );
}
