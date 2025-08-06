import {Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {StoreDispatch} from '../redux/store';
import {ArrayType, EpisodeState, EpisodeTypes} from '../types/api.model';
import {episodesApiGet} from '../redux/slices/episodeSlice';
import {personEpisodeGet} from '../redux/slices/characterSlice';
import {closeModal, openModal} from '../redux/slices/modalSlice';
import {EpiTypes} from '../types/component.model';
import App_loading from '../component/app/App_loading';
import Ep_characher from '../component/episode/Ep_characher';
import Ep_detail from '../component/episode/Ep_detail';

export default function EpisodePage() {
  const dispatch = useDispatch<StoreDispatch>();
  const {list, loading, error}: EpisodeState = useSelector(
    (state: ArrayType) => state.episodeKey,
  );

  const {isOpen, selectedSeries} = useSelector(
    (state: ArrayType) => state.modalKey,
  );
  const {episodeList} = useSelector((state: ArrayType) => state.characterKey);
  const [intro, setIntro] = useState<string | null>(null);
  const [quarter, setQuarter] = useState<string | null>(null);
  const [click, setClick] = useState<string | null>(null);
  const [title1, setTitle1] = useState<string | null>(null);
  const [title2, setTitle2] = useState<string | null>(null);
  const [isModal, setIsModal] = useState<string | null>(null);

  useEffect(() => {
    dispatch(episodesApiGet());
    dispatch(personEpisodeGet());
  }, [dispatch]);

  const clickEpi = (id: EpisodeTypes) => {
    setIsModal('episode');
    dispatch(openModal(id.series));
    setIntro(id.intro);
    setQuarter(id.quarter);
  };

  const clickCharacher = (select: EpiTypes) => {
    setIsModal('character');
    dispatch(
      openModal({
        kidcases: select.kidcases,
        kidmovies: select.kidmovies,
        cases: select.cases,
        movies: select.movies,
      }),
    );
    setClick(select.quarter);
    setTitle1(select.title1);
    setTitle2(select.title2);
  };

  const closeEpi = () => {
    dispatch(closeModal(null));
    setIsModal(null);
  };

  const epiScroll = () => {
    const epi = document.getElementById('episodes');
    if (epi) {
      epi.scrollIntoView({behavior: 'smooth'});
    }
  };

  const chaScroll = () => {
    const cha = document.getElementById('charaterepisodes');
    if (cha) {
      cha.scrollIntoView({behavior: 'smooth'});
    }
  };

  if (loading) return <App_loading />;
  if (error) return <p>에러...</p>;

  return (
    <div className="container">
      <br />
      <br />
      <h2 className="text-center">에피소드 모음(더빙)</h2>
      <p className="text-center">블로거 "멍멍식"님의 포스팅을 참고했어요</p>
      <div className="row text-center">
        <div className="col">
          <button
            className="btn btn-link d-inline no-underline"
            onClick={epiScroll}>
            ▼중요 에피소드
          </button>
          <button
            className="btn btn-link d-inline no-underline"
            onClick={chaScroll}>
            ▼캐릭터 에피소드
          </button>
        </div>
      </div>

      <Ep_detail
        isOpen={isOpen && isModal === 'episode'}
        selectedSeries={
          selectedSeries
            ? selectedSeries.map((ep: any) => ({
                ...ep,
                title: ep.title ?? '',
                season: ep.season ?? '',
              }))
            : null
        }
        closeEpi={closeEpi}
        intro={intro ? intro : ''}
        quarter={quarter ? quarter : ''}
      />
      <Ep_characher
        isOpen={isOpen && isModal === 'character'}
        selectedSeries={selectedSeries}
        closeEpi={closeEpi}
        click={click ?? ''}
        title1={title1 ?? ''}
        title2={title2 ?? ''}
      />
      <br />
      <div className="row text-center border">
        <h3 className="custom-bg">중요 에피소드 모음</h3>
        {[...list].map((v, idx) => (
          <Col
            className="mb-4"
            key={idx}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            id="episodes">
            <div className="card" onClick={() => clickEpi(v)}>
              <img src={v.img} alt="에피소드" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title"> {v.intro}</h5>
                <p className="card-text">{v.quarter}</p>
              </div>
            </div>
          </Col>
        ))}
      </div>
      <br />
      {/* 캐릭터 에피소드 */}
      <div className="row text-center" id="charaterepisodes">
        <h3 className="custom-bg">캐릭터 에피소드 모음</h3>
        {[...episodeList].map((v, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card" onClick={() => clickCharacher(v)}>
              <img src={v.img} alt="에피소드" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title"> {v.quarter}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
