import {Modal} from 'react-bootstrap';
import {EpiCharacterModalPayload} from '../../types/component.model';

type EpCharacterProps = {
  isOpen: boolean;
  selectedSeries: EpiCharacterModalPayload | null;
  closeEpi: () => void;
  click: string;
  title1: string;
  title2: string;
};

export default function Ep_characher({
  isOpen,
  selectedSeries,
  closeEpi,
  click,
  title1,
  title2,
}: EpCharacterProps) {
  if (!isOpen || !selectedSeries) return null;

  const {kidcases, kidmovies, cases, movies} = selectedSeries;
  const seriesList = kidcases.length > 0 ? kidcases : cases;
  const movieList = kidmovies.length > 0 ? kidmovies : movies;

  return (
    <Modal show={isOpen} onHide={closeEpi} centered>
      <Modal.Header closeButton>
        <Modal.Title>{click}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{maxHeight: '70vh', overflowY: 'auto'}}>
        <h2>{title1}</h2>
        <ul>
          {seriesList.map((v, idx) => (
            <li key={idx}>
              <strong>{v.title}</strong> {v.TVA}
            </li>
          ))}
        </ul>

        <hr />

        <h2>{title2}</h2>
        <ul>
          {movieList.map((v, idx) => (
            <li key={idx}>
              <strong>
                {v.season} {v.title}
              </strong>
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
