'use client';

import {Modal} from 'react-bootstrap';
import {CoupleModalType} from '../../types/component.model';
import {getCoupleType} from '../../utils/coupleType';
import GemHint from '../common/GemHint';
import './Ch_detail.css';

const UNKNOWN_MARKERS = ['??', ''];

const hasValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  return !UNKNOWN_MARKERS.includes(String(value));
};

export default function Ch_coupleDetail({
  open,
  close,
  couple,
}: CoupleModalType) {
  if (!open) return null;

  if (!couple) {
    return (
      <Modal show={open} onHide={close} centered className="hs-modal">
        <div
          className="hs-card"
          style={{'--accent': '#8a8f98'} as React.CSSProperties}>
          <button className="hs-card__close" onClick={close} aria-label="닫기">
            ✕
          </button>
          <div
            style={{padding: '32px 18px', textAlign: 'center', color: '#fff'}}>
            not found🥲🥲
            <p className="text-muted mt-2 mb-0">해당 커플이 없습니다.</p>
          </div>
        </div>
      </Modal>
    );
  }

  const type = getCoupleType(couple.relationship_type);
  const cardVars = {
    '--accent': type.accent,
    '--accent-soft': type.accentSoft,
    '--bg-from': type.bgFrom,
    '--bg-to': type.bgTo,
  } as React.CSSProperties;

  const episodes = couple.episodes ?? [];
  const movies = couple.movies ?? [];

  return (
    <Modal show={open} onHide={close} centered className="hs-modal hs-modal--couple">
      <div className="hs-card" style={cardVars}>
        <button className="hs-card__close" onClick={close} aria-label="닫기">
          ✕
        </button>

        <div className="hs-card__portrait hs-card__portrait--split">
          <div className="hs-card__portrait-half">
            <img src={couple.man_url} alt={couple.man} />
          </div>
          <div className="hs-card__portrait-half">
            <img src={couple.women_url} alt={couple.women} />
          </div>
          <div className="hs-card__portrait-divider" />
          <GemHint
            className="hs-card__portrait-heart gem-hint--pop gem-hint--center"
            title={type.label}
            description={type.description}>
            {type.icon}
          </GemHint>
          <div className="hs-card__portrait-shade" />

          {hasValue(couple.status) && (
            <GemHint
              className="hs-card__gem hs-card__gem--status-couple gem-hint--drop gem-hint--left"
              title="혼인 상태"
              description={`현재 ${couple.status} 상태예요.`}>
              {couple.status}
            </GemHint>
          )}
          <GemHint
            className="hs-card__gem hs-card__gem--ep-count gem-hint--pop gem-hint--left"
            title="등장 에피소드 수"
            description={`이 커플이 등장한 주요 에피소드는 총 ${episodes.length}개예요.`}>
            📺{episodes.length}
          </GemHint>
          <GemHint
            className="hs-card__gem hs-card__gem--movie-count gem-hint--pop gem-hint--right"
            title="등장 극장판 수"
            description={`이 커플이 등장한 극장판은 총 ${movies.length}개예요.`}>
            🎬{movies.length}
          </GemHint>

          <div className="hs-card__banner">
            <div className="hs-card__name">
              {couple.couple_nickname || `${couple.man} & ${couple.women}`}
            </div>
            <div className="hs-card__subname">
              {couple.man} ❤ {couple.women}
            </div>
          </div>
        </div>

        <div className="hs-card__body">
          <span className="hs-card__type-tag">
            {type.icon} {type.label}
          </span>

          {(hasValue(couple.man_job) || hasValue(couple.women_job)) && (
            <div className="mt-1 mb-1">
              {hasValue(couple.man_job) && (
                <div className="hs-card__row">
                  <div className="hs-card__row-label">{couple.man}</div>
                  <div className="hs-card__row-value">{couple.man_job}</div>
                </div>
              )}
              {hasValue(couple.women_job) && (
                <div className="hs-card__row">
                  <div className="hs-card__row-label">{couple.women}</div>
                  <div className="hs-card__row-value">{couple.women_job}</div>
                </div>
              )}
            </div>
          )}

          {hasValue(couple.description) && (
            <p className="hs-card__description">{couple.description}</p>
          )}

          {episodes.length > 0 && (
            <div className="hs-card__section">
              <div className="hs-card__section-title">📺 주요 에피소드</div>
              {episodes.map(ep => (
                <div className="hs-card__list-item" key={ep.title}>
                  <div className="hs-card__list-item-title">{ep.title}</div>
                  {hasValue(ep.source) && (
                    <div className="hs-card__list-item-source">
                      {ep.source}
                    </div>
                  )}
                  {hasValue(ep.description) && (
                    <div className="hs-card__list-item-desc">
                      {ep.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {movies.length > 0 && (
            <div className="hs-card__section">
              <div className="hs-card__section-title">🎬 등장 극장판</div>
              {movies.map(mv => (
                <div className="hs-card__list-item" key={mv.title}>
                  <div className="hs-card__list-item-title">
                    {hasValue(mv.number) ? `${mv.number} · ` : ''}
                    {mv.title}
                  </div>
                  {hasValue(mv.note) && (
                    <div className="hs-card__list-item-desc">{mv.note}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!hasValue(couple.description) &&
            episodes.length === 0 &&
            movies.length === 0 && (
              <p className="hs-card__empty">
                아직 확인된 상세 정보가 없어요.
              </p>
            )}
        </div>
      </div>
    </Modal>
  );
}
