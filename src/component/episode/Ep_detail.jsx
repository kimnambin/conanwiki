import React from 'react';

export default function Ep_detail({isOpen, selectedSeries, closeEpi}) {
  if (!isOpen || !selectedSeries) return null;

  return (
    <div className="modal" style={{display: isOpen ? 'block' : 'none'}}>
      <div className="modal-content" style={{height: '200px'}}>
        <h2>에피소드 시리즈 상세 정보</h2>
        <button onClick={closeEpi}>닫기</button>{' '}
        <ul>
          {selectedSeries.map((v, idx) => (
            <li key={idx}>
              <strong>{v.season}:</strong> {v.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
