'use client';

import Image from 'next/image';
import {Modal} from 'react-bootstrap';
import {
  EpiCharacterModalPayload,
  EpiMovies,
  EpiSeries,
} from '../../types/component.model';
import {CHARACTER_EPISODE_THEME} from '../../utils/episodeTheme';
import './Ep_characher.css';

type EpCharacterProps = {
  isOpen: boolean;
  selectedSeries: EpiCharacterModalPayload | null;
  closeEpi: () => void;
  click: string;
  title1: string;
  title2: string;
};

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const thumb = e.currentTarget.parentElement;
  if (thumb) thumb.style.display = 'none';
};

const ItemMeta = ({
  characters,
  연계,
  비고,
  namu_url,
}: Pick<EpiSeries, 'characters' | '연계' | '비고' | 'namu_url'>) => (
  <>
    {characters && characters.length > 0 && (
      <div className="epc-card__item-chars">
        {characters.map(c => (
          <span className="epc-card__item-char" key={c}>
            {c}
          </span>
        ))}
      </div>
    )}
    {연계 && Object.keys(연계).length > 0 && (
      <div className="epc-card__item-relation">
        🔗{' '}
        {Object.entries(연계)
          .map(([k, v]) => `${k}: ${v}`)
          .join(' · ')}
      </div>
    )}
    {비고 && <div className="epc-card__item-note">{비고}</div>}
    {namu_url && (
      <a
        href={namu_url}
        target="_blank"
        rel="noopener noreferrer"
        className="epc-card__item-link">
        나무위키에서 보기 ↗
      </a>
    )}
  </>
);

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
  const seriesList = kidcases && kidcases.length > 0 ? kidcases : cases ?? [];
  const movieList = kidmovies && kidmovies.length > 0 ? kidmovies : movies ?? [];

  const theme = CHARACTER_EPISODE_THEME;
  const cardVars = {
    '--accent': theme.accent,
    '--accent-soft': theme.accentSoft,
    '--bg-from': theme.bgFrom,
    '--bg-to': theme.bgTo,
  } as React.CSSProperties;

  return (
    <Modal show={isOpen} onHide={closeEpi} centered className="epc-modal">
      <div className="epc-card" style={cardVars}>
        <button className="epc-card__close" onClick={closeEpi} aria-label="닫기">
          ✕
        </button>

        <div className="epc-card__header">
          <div className="epc-card__title">{click}</div>
        </div>

        <div className="epc-card__body">
          {seriesList.length > 0 && (
            <div>
              <div className="epc-card__section-title">{title1}</div>
              {seriesList.map((v, idx) => (
                <div
                  className={`epc-card__item ${v.is_key ? 'is-key' : ''}`}
                  key={idx}>
                  {v.img && (
                    <div className="epc-card__item-thumb">
                      <Image
                        src={v.img}
                        alt=""
                        width={56}
                        height={56}
                        onError={hideOnError}
                      />
                    </div>
                  )}
                  <div className="epc-card__item-main">
                    <div className="epc-card__item-top">
                      <span className="epc-card__item-order">{v.TVA}</span>
                      {v.is_key && (
                        <span className="epc-card__item-key">⭐ 핵심</span>
                      )}
                    </div>
                    <div className="epc-card__item-title">{v.title}</div>
                    <ItemMeta
                      characters={v.characters}
                      연계={v.연계}
                      비고={v.비고}
                      namu_url={v.namu_url}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {movieList.length > 0 && (
            <div>
              <div className="epc-card__section-title">{title2}</div>
              {movieList.map((v: EpiMovies, idx) => (
                <div
                  className={`epc-card__item ${v.is_key ? 'is-key' : ''}`}
                  key={idx}>
                  {v.img && (
                    <div className="epc-card__item-thumb">
                      <Image
                        src={v.img}
                        alt=""
                        width={56}
                        height={56}
                        onError={hideOnError}
                      />
                    </div>
                  )}
                  <div className="epc-card__item-main">
                    <div className="epc-card__item-top">
                      <span className="epc-card__item-order">
                        {v.season}
                        {v.type ? ` ${v.type}` : ''}
                      </span>
                      {v.is_key && (
                        <span className="epc-card__item-key">⭐ 핵심</span>
                      )}
                    </div>
                    <div className="epc-card__item-title">{v.title}</div>
                    {v.note && (
                      <div className="epc-card__item-sub">{v.note}</div>
                    )}
                    <ItemMeta
                      characters={v.characters}
                      연계={v.연계}
                      비고={v.비고}
                      namu_url={v.namu_url}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
