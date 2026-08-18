'use client';

import {Modal} from 'react-bootstrap';
import {ModalType} from '../../types/component.model';
import {getCharacterType} from '../../utils/characterType';
import {renderBreaks} from '../../utils/renderBreaks';
import GemHint from '../common/GemHint';
import './Ch_detail.css';

const UNKNOWN_MARKERS = ['??', ''];

const hasValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  return !UNKNOWN_MARKERS.includes(String(value));
};

const InfoRow = ({label, value}: {label: string; value: unknown}) => {
  if (!hasValue(value)) return null;
  return (
    <div className="hs-card__row">
      <div className="hs-card__row-label">{label}</div>
      <div className="hs-card__row-value">{renderBreaks(String(value))}</div>
    </div>
  );
};

export default function Ch_detail({open, close, character}: ModalType) {
  if (!open) return null;

  if (!character) {
    return (
      <Modal show={open} onHide={close} centered className="hs-modal">
        <div className="hs-card" style={{'--accent': '#8a8f98'} as React.CSSProperties}>
          <button className="hs-card__close" onClick={close} aria-label="닫기">
            ✕
          </button>
          <div style={{padding: '32px 18px', textAlign: 'center', color: '#fff'}}>
            not found🥲🥲
            <p className="text-muted mt-2 mb-0">해당 캐릭터가 없습니다.</p>
          </div>
        </div>
      </Modal>
    );
  }

  const voice = character.voice?.[0];
  const originalName = character.name.japanese;
  const type = getCharacterType(character.affiliation);
  const cardVars = {
    '--accent': type.accent,
    '--accent-soft': type.accentSoft,
    '--bg-from': type.bgFrom,
    '--bg-to': type.bgTo,
  } as React.CSSProperties;

  const statusText = hasValue(character.status) ? character.status : null;
  const statusClass = !statusText
    ? 'is-unknown'
    : statusText.includes('사망')
    ? 'is-dead'
    : statusText.includes('생존')
    ? 'is-alive'
    : 'is-unknown';

  const hasDetails =
    hasValue(character.occupation) ||
    hasValue(character.date_of_birth) ||
    hasValue(character.first_appearance.anime) ||
    hasValue(character.aliases) ||
    hasValue(voice?.japanese) ||
    hasValue(voice?.korean) ||
    hasValue(character.drama_actor);

  return (
    <Modal show={open} onHide={close} centered className="hs-modal">
      <div className="hs-card" style={cardVars}>
        <button className="hs-card__close" onClick={close} aria-label="닫기">
          ✕
        </button>

        <div className="hs-card__portrait">
          <img src={character.img} alt={character.name.korean.name} />
          <div className="hs-card__portrait-shade" />

          {hasValue(character.age) && (
            <GemHint
              className="hs-card__gem hs-card__gem--age gem-hint--drop gem-hint--left"
              title="나이"
              description={`작중 설정상 나이는 ${character.age}세예요.`}>
              {character.age}
            </GemHint>
          )}

          <GemHint
            className="hs-card__gem hs-card__gem--type gem-hint--pop gem-hint--left"
            title={type.label}
            description={type.description}>
            {type.icon}
          </GemHint>

          {statusText && (
            <GemHint
              className={`hs-card__gem hs-card__gem--status ${statusClass} gem-hint--pop gem-hint--right`}
              title="생사 여부"
              description={`현재 ${statusText} 상태예요. (❤ 생존 / 💀 사망)`}>
              {statusClass === 'is-dead' ? '💀' : '❤'}
            </GemHint>
          )}

          <div className="hs-card__banner">
            <div className="hs-card__name">{character.name.korean.name}</div>
            {originalName && hasValue(originalName.kanji) && (
              <div className="hs-card__subname">
                {originalName.kanji}
                {hasValue(originalName.romanized) &&
                  ` (${originalName.romanized})`}
              </div>
            )}
          </div>
        </div>

        <div className="hs-card__body">
          <span className="hs-card__type-tag">
            {type.icon} {type.label}
          </span>

          {hasDetails ? (
            <div>
              <InfoRow label="직업" value={character.occupation} />
              <InfoRow label="생년월일" value={character.date_of_birth} />
              <InfoRow
                label="첫 등장"
                value={character.first_appearance.anime}
              />
              <InfoRow label="별명" value={character.aliases} />
              <InfoRow label="일본판 성우" value={voice?.japanese} />
              <InfoRow label="한국판 성우" value={voice?.korean} />
              <InfoRow label="드라마 배우" value={character.drama_actor} />
            </div>
          ) : (
            <p className="hs-card__empty">아직 확인된 상세 정보가 없어요.</p>
          )}
        </div>

        {hasValue(character.namuwikiUrl) && (
          <div className="hs-card__footer">
            <a
              href={character.namuwikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hs-card__wiki-link">
              나무위키에서 더 보기 ↗
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
