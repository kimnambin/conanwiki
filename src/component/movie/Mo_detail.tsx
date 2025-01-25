// const VIDEO_BASE_URL = 'https://www.youtube.com/embed/';
// const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

import {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {MovieDetail} from '../../api/movieApi';
import {useSelector} from 'react-redux';
import {Col, Container} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import App_loading from '../App/App_loading';
import {ArrayType, MovieType} from '../../types/api';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Mo_detail() {
  const {id} = useParams(); // URL에서 영화 ID 가져오기
  const [moviedata, setMoviedata] = useState<MovieType[] | null>(null);
  const {loading, error} = useSelector((state: ArrayType) => state.movieKey);

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

  return (
    <Container className="text-center">
      <br />
      <br />

      <h3>{title}</h3>
      <p>개봉일 : {releaseDate}</p>
      <p>관객 평점 : {vote_average}</p>
      <p>인기도 : {popularity}</p>
      <Col xs={12} className="text-left">
        <p>{overview}</p>
      </Col>

      {moviedata && moviedata.length > 0 ? (
        moviedata.map((data, index) => (
          <Col xs={12} key={index}>
            <iframe
              width="80%"
              height="360"
              src={`https://www.youtube.com/embed/${data.key}`}
              title={data.name}
              frameBorder="0"
              allowFullScreen
              // style={{maxWidth: '100%'}}
            />
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
