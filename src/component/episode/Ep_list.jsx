import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from 'react-redux';
import {episodesApiGet} from '../../redux/slices/episodeSlice';
import {personEpisodeGet} from '../../redux/slices/characterSlice';
import {useEffect, useState} from 'react';
import {openModal, closeModal} from '../../redux/slices/modalSlice';
import Ep_detail from './Ep_detail';
import App_loading from '../App/App_loading';
import Ep_characher from './Ep_characher';

export default function Ep_list() {
  const dispatch = useDispatch();
  const {list, loading, error} = useSelector(state => state.episodeKey);
  const {isOpen, selectedSeries} = useSelector(state => state.modalKey);
  const {episodeList} = useSelector(state => state.characterKey);
  const [intro, setIntro] = useState(null);
  const [quarter, setQuarter] = useState(null);
  const [click, setClick] = useState(null);
  const [title1, setTitle1] = useState(null);
  const [title2, setTitle2] = useState(null);
  const [isModal, setIsModal] = useState(null); //어떤 모달창인가 확인용

  useEffect(() => {
    dispatch(episodesApiGet());
    dispatch(personEpisodeGet());
  }, [dispatch]);

  const clickEpi = id => {
    setIsModal('episode');
    dispatch(openModal(id.series));
    setIntro(id.intro);
    setQuarter(id.quarter);
  };

  const clickCharacher = select => {
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

    // console.log(select);
  };

  const closeEpi = () => {
    dispatch(closeModal());
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
        selectedSeries={selectedSeries}
        closeEpi={closeEpi}
        intro={intro}
        quarter={quarter}
      />
      <Ep_characher
        isOpen={isOpen && isModal === 'character'}
        selectedSeries={selectedSeries}
        closeEpi={closeEpi}
        click={click}
        title1={title1}
        title2={title2}
      />
      <br />
      <div className="row text-center border">
        <h3 className="custom-bg">중요 에피소드 모음</h3>
        {[...list].map((v, idx) => (
          <div
            className="col-md-4 mb-4"
            key={idx}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            id="episodes">
            <div className="card" onClick={() => clickEpi(v)}>
              <img src={v.img} alt="에피소드" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title"> {v.intro}</h5>
                <p className="card-text">{v.quarter}</p>
              </div>
            </div>
          </div>
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
