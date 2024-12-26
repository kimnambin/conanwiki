import {Modal} from 'react-bootstrap';

export default function Ch_detail({open, close, character}) {
  if (!open) return null;

  return (
    <Modal show={open} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{character.name.korean.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={character.imgage}
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <p>직업: {character.occupation}</p>
        <p>나이: {character.age}</p>
        <p>첫등장: {character.first_appearance.anime}</p>
        <p>별명: {character.aliases}</p>
      </Modal.Body>
    </Modal>
  );
}
