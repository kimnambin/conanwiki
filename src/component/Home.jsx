import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import {useDispatch, useSelector} from 'react-redux';
import {character} from '../redux/slices/characterSlice';
import {fetchMovie} from '../redux/slices/movieSlice';
import {useEffect} from 'react';

export default function Home() {
  const dispatch = useDispatch();
  const {list, loading, error} = useSelector(state => state.characterKey);
  const {movieList} = useSelector(state => state.movieKey);

  useEffect(() => {
    dispatch(character());
    dispatch(fetchMovie());
  }, [dispatch]);

  return (
    <div className="container-fluid text-center bg-grey">
      <div className="row text-center slideanim">
        <div className="col-sm-4">
          <Link to="/character">
            <div className="card mb-4">
              <img
                src="../../public/conanCha_11zon.webp"
                alt="캐릭터"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">등장인물</h5>
                <p className="card-text">명탐정 코난 등장인물 모음</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-4">
          <Link to="/movie">
            <div className="card mb-4">
              <img
                src="../../public/conanMo_11zon.webp"
                alt="극장판"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">극장판</h5>
                <p className="card-text">명탐정 코난 극장판 모음</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-4">
          <Link to="/episodes">
            <div className="card mb-4">
              <img
                src="../../public/conanEpi_11zon.webp"
                alt="에피소드"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">에피소드</h5>
                <p className="card-text">명탐정 코난 중요 에피소드 모음</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
