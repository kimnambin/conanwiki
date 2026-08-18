'use client';

import {Col} from 'react-bootstrap';
import {useState} from 'react';
import {EpisodeTypes, SeriesType} from '../../types/api.model';
import {EpiTypes, EpiCharacterModalPayload} from '../../types/component.model';
import Ep_characher from './Ep_characher';
import Ep_detail from './Ep_detail';
import ToggleSwitch from '../common/ToggleSwitch';
import {
  CHARACTER_EPISODE_THEME,
  EPISODE_THEME,
  EpisodeLang,
} from '../../utils/episodeTheme';
import './EpisodePage.css';

interface EpisodeBrowserProps {
  episodesDub: EpisodeTypes[];
  episodesSub: EpisodeTypes[];
  personEpisodes: EpiTypes[];
}

type ModalKind = 'episode' | 'character' | null;

// 더빙/자막 토글과 에피소드/캐릭터 에피소드 모달을 담당하는 클라이언트 컴포넌트.
// 데이터 자체는 서버 컴포넌트(episodes/page.tsx)가 JSON을 미리 읽어 내려준다.
export default function EpisodeBrowser({
  episodesDub,
  episodesSub,
  personEpisodes,
}: EpisodeBrowserProps) {
  const [lang, setLang] = useState<EpisodeLang>('dub');
  const [modalKind, setModalKind] = useState<ModalKind>(null);
  const [selectedSeries, setSelectedSeries] = useState<SeriesType[] | null>(
    null,
  );
  const [selectedCharacterEpi, setSelectedCharacterEpi] =
    useState<EpiCharacterModalPayload | null>(null);
  const [intro, setIntro] = useState('');
  const [quarter, setQuarter] = useState('');
  const [click, setClick] = useState('');
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');

  const activeList = lang === 'dub' ? episodesDub : episodesSub;
  const theme = EPISODE_THEME[lang];
  const themeVars = {
    '--accent': theme.accent,
    '--accent-soft': theme.accentSoft,
    '--bg-from': theme.bgFrom,
    '--bg-to': theme.bgTo,
  } as React.CSSProperties;
  const characterThemeVars = {
    '--accent': CHARACTER_EPISODE_THEME.accent,
    '--accent-soft': CHARACTER_EPISODE_THEME.accentSoft,
    '--bg-from': CHARACTER_EPISODE_THEME.bgFrom,
    '--bg-to': CHARACTER_EPISODE_THEME.bgTo,
  } as React.CSSProperties;

  const clickEpi = (id: EpisodeTypes) => {
    setModalKind('episode');
    setSelectedSeries(id.series);
    setIntro(id.intro);
    setQuarter(id.quarter);
  };

  const clickCharacher = (select: EpiTypes) => {
    setModalKind('character');
    setSelectedCharacterEpi({
      kidcases: select.kidcases,
      kidmovies: select.kidmovies,
      cases: select.cases,
      movies: select.movies,
    });
    setClick(select.quarter);
    setTitle1(select.title1);
    setTitle2(select.title2);
  };

  const closeEpi = () => {
    setModalKind(null);
    setSelectedSeries(null);
    setSelectedCharacterEpi(null);
  };

  return (
    <div className="container">
      <br />
      <br />
      <h2 className="text-center">
        에피소드 모음 ({lang === 'dub' ? '더빙판' : '자막판'})
      </h2>
      <p className="text-center">
        블로거 &quot;멍멍식&quot;님의 포스팅을 참고했어요
      </p>
      <div className="text-center">
        <ToggleSwitch
          value={lang}
          onChange={setLang}
          options={[
            {value: 'dub', label: '🎙️ 더빙판'},
            {value: 'sub', label: '💬 자막판'},
          ]}
        />
      </div>

      <Ep_detail
        isOpen={modalKind === 'episode'}
        selectedSeries={selectedSeries}
        closeEpi={closeEpi}
        intro={intro}
        quarter={quarter}
        lang={lang}
      />
      <Ep_characher
        isOpen={modalKind === 'character'}
        selectedSeries={selectedCharacterEpi}
        closeEpi={closeEpi}
        click={click}
        title1={title1}
        title2={title2}
      />
      <br />
      <div className="text-center" id="episodes">
        <span className="episode-section-title">중요 에피소드 모음</span>
      </div>
      <div className="row g-3 justify-content-center">
        {activeList.map(v => (
          <Col
            className="episode-card-col d-flex justify-content-center align-items-center"
            key={v.quarter}
            xs={6}
            sm={4}
            md={3}
            lg={3}
            xl={2}>
            <div
              className="episode-card"
              style={themeVars}
              onClick={() => clickEpi(v)}>
              <span className="episode-card__badge" title="포함된 에피소드 수">
                📺{v.series.length}
              </span>
              <div className="episode-card__img">
                <img src={v.img} alt="" />
              </div>
              <div className="episode-card__shade" />
              <div className="episode-card__name-plate">
                <div className="episode-card__intro">{v.intro}</div>
                <div className="episode-card__quarter">{v.quarter}</div>
              </div>
            </div>
          </Col>
        ))}
      </div>
      <br />
      {/* 캐릭터 에피소드 */}
      <div className="text-center" id="charaterepisodes">
        <span className="episode-section-title">캐릭터 에피소드 모음</span>
      </div>
      <div className="row g-3 justify-content-center">
        {personEpisodes.map(v => {
          const itemCount =
            (v.kidcases?.length ?? 0) +
            (v.kidmovies?.length ?? 0) +
            (v.cases?.length ?? 0) +
            (v.movies?.length ?? 0);

          return (
            <Col
              className="episode-card-col d-flex justify-content-center align-items-center"
              key={v.quarter}
              xs={6}
              sm={4}
              md={3}
              lg={3}
              xl={2}>
              <div
                className="episode-card"
                style={characterThemeVars}
                onClick={() => clickCharacher(v)}>
                <span
                  className="episode-card__badge"
                  title="포함된 에피소드/극장판 수">
                  🎬{itemCount}
                </span>
                <div className="episode-card__img">
                  <img src={v.img} alt="" />
                </div>
                <div className="episode-card__shade" />
                <div className="episode-card__name-plate">
                  <div className="episode-card__intro">{v.quarter}</div>
                </div>
              </div>
            </Col>
          );
        })}
      </div>
    </div>
  );
}
