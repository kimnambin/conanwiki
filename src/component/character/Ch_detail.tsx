import {Modal} from 'react-bootstrap';
import {ModalType} from '../../types/component';

export default function Ch_detail({open, close, character}: ModalType) {
  if (!open) return null;

  if (!character) {
    return (
      <Modal show={open} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>not found🥲🥲</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>해당 캐릭터가 없습니다.</p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={open} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{character.name.korean.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={character.img}
          alt={character.name.korean.name}
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <p>직업: {character.occupation}</p>
        <p>나이: {character.age}</p>
        <p>첫 등장: {character.first_appearance.anime}</p>
        <p>별명: {character.aliases}</p>
      </Modal.Body>
    </Modal>
  );
}
