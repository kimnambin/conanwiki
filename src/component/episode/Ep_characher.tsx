import {Modal} from 'react-bootstrap';

type EpCharacterProps = {
  isOpen: boolean;
  selectedSeries: {
    kidcases?: {title: string; TVA?: string}[];
    kidmovies?: {season?: string; title: string}[];
    cases?: {title: string; TVA?: string}[];
    movies?: {season?: string; title: string}[];
    [key: string]: any;
  } | null;
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
  const {
    kidcases = [],
    kidmovies = [],
    cases = [],
    movies = [],
  } = selectedSeries || {};

  if (!isOpen || !selectedSeries) return null;

  return (
    <Modal show={isOpen} onHide={closeEpi} centered>
      <Modal.Header closeButton>
        <Modal.Title>{click}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {kidcases.length > 0 ? (
          <>
            <h2>{title1}</h2>
            <ul>
              {kidcases.map((v, idx) => (
                <li key={idx}>
                  <strong>{v.title}</strong> {v.TVA}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>{title1}</h2>
            <ul>
              {cases.map((v, idx) => (
                <li key={idx}>
                  <strong>{v.title}</strong> {v.TVA}
                </li>
              ))}
            </ul>
          </>
        )}

        <hr />

        {kidmovies.length > 0 ? (
          <>
            <h2>{title2}</h2>
            <ul>
              {kidmovies.map((v, idx) => (
                <li key={idx}>
                  <strong>
                    {v.season} {v.title}
                  </strong>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>{title2}</h2>
            <ul>
              {movies.map((v, idx) => (
                <li key={idx}>
                  <strong>
                    {v.season} {v.title}
                  </strong>
                </li>
              ))}
            </ul>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
