'use client';

import {Modal} from 'react-bootstrap';
import {SeriesType} from '../../types/api.model';
import {EPISODE_THEME, EpisodeLang} from '../../utils/episodeTheme';
import './Ep_detail.css';

interface EpDetailProps {
  isOpen: boolean;
  selectedSeries: SeriesType[] | null;
  closeEpi: () => void;
  intro?: string;
  quarter?: string;
  lang: EpisodeLang;
}

export default function Ep_detail({
  isOpen,
  selectedSeries,
  closeEpi,
  intro,
  quarter,
  lang,
}: EpDetailProps) {
  if (!isOpen || !selectedSeries) return null;

  const theme = EPISODE_THEME[lang];
  const cardVars = {
    '--accent': theme.accent,
    '--accent-soft': theme.accentSoft,
    '--bg-from': theme.bgFrom,
    '--bg-to': theme.bgTo,
  } as React.CSSProperties;

  return (
    <Modal show={isOpen} onHide={closeEpi} centered className="epi-modal">
      <div className="epi-card" style={cardVars}>
        <button className="epi-card__close" onClick={closeEpi} aria-label="닫기">
          ✕
        </button>

        <div className="epi-card__header">
          <div className="epi-card__title">{intro}</div>
          {quarter && <div className="epi-card__subtitle">{quarter}</div>}
        </div>

        <div className="epi-card__body">
          {selectedSeries.map((v, idx) => (
            <div className="epi-card__item" key={idx}>
              <div className="epi-card__item-season">{v.season}</div>
              <div className="epi-card__item-title">{v.title}</div>
              {v.비고 && <div className="epi-card__item-note">{v.비고}</div>}
              {v.namu_url && (
                <a
                  href={v.namu_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="epi-card__item-link">
                  나무위키에서 보기 ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
