import {useEffect, useState} from 'react';
import {useParams, useLocation, Link} from 'react-router-dom';
import {MovieDetail} from '../../api/movieApi';
import {useSelector} from 'react-redux';
import {Col, Container} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import App_loading from '../app/App_loading';
import {MovieType} from '../../types/api.model';
import {RootState} from '../../redux/store';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Mo_detail() {
  const {id} = useParams(); // URL에서 영화 ID 가져오기
  const [moviedata, setMoviedata] = useState<MovieType[] | null>(null);
  const {loading, error} = useSelector((state: RootState) => state.movieKey);

  const location = useLocation();
  const {
    overview,
    release_date: releaseDate,
    title,
    vote_average,
    popularity,
    image,
  } = location.state || {}; // Link로 props로 받아오려면 'useLoaction'을 사용해야 함

  useEffect(() => {
    const fetchmovie = async () => {
      try {
        if (id) {
          const data = await MovieDetail(Number(id));
          setMoviedata(data.results);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchmovie();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <App_loading />;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  const formattedRating =
    typeof vote_average === 'number' ? vote_average.toFixed(1) : vote_average;
  const formattedPopularity =
    typeof popularity === 'number' ? Math.round(popularity) : popularity;

  return (
    <Container className="text-center">
      <br />
      <div className="text-start">
        <Link to="/conanwiki/movies">← 극장판 목록으로</Link>
      </div>
      <br />

      <h3>{title}</h3>
      <p>개봉일 : {releaseDate}</p>
      <p>관객 평점 : {formattedRating}</p>
      <p>인기도 : {formattedPopularity}</p>
      <div style={{maxWidth: '700px', margin: '0 auto 24px'}} className="text-start">
        <p>{overview}</p>
      </div>

      {moviedata && moviedata.length > 0 ? (
        moviedata.map(data => (
          <Col xs={12} key={data.key} className="mb-4">
            <div
              style={{
                position: 'relative',
                width: '80%',
                margin: '0 auto',
                paddingBottom: '56.25%',
                height: 0,
              }}>
              <iframe
                src={`https://www.youtube.com/embed/${data.key}`}
                title={data.name}
                frameBorder="0"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </Col>
        ))
      ) : (
        <Card.Img
          variant="mid"
          src={`${IMAGE_BASE_URL}${image}`}
          alt=""
          style={{
            maxHeight: '800px',
            width: '30%',
            objectFit: 'cover',
          }}
        />
      )}
      <br />
      <br />
    </Container>
  );
}
