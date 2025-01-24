import {Modal} from 'react-bootstrap';

export default function Ep_detail({
  isOpen,
  selectedSeries,
  closeEpi,
  intro,
  quarter,
}) {
  if (!isOpen || !selectedSeries) return null;

  return (
    <Modal show={isOpen} onHide={closeEpi} centered>
      <Modal.Header closeButton>
        <Modal.Title>{intro}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className="text-center">{quarter} 상세 정보</h3>
        <ul>
          {selectedSeries.map((v, idx) => (
            <li key={idx}>
              <strong>{v.season}:</strong> {v.title}
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
