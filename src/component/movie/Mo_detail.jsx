// const VIDEO_BASE_URL = 'https://www.youtube.com/embed/';
// const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {MovieDetail} from '../../api/movieApi';
import {useSelector} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import App_loading from '../App/App_loading';

export default function Mo_detail() {
  const {id} = useParams(); // URL에서 영화 ID 가져오기
  const [moviedata, setMoviedata] = useState(null);
  const {loading, error} = useSelector(state => state.movieKey);

  const location = useLocation();
  const {
    overview,
    release_date: releaseDate,
    title,
    vote_average,
    popularity,
  } = location.state || {}; // Link로 props로 받아오려면 'useLoaction'을 사용해야 함

  useEffect(() => {
    const fetchmovie = async () => {
      try {
        const data = await MovieDetail(id);
        setMoviedata(data.results);
      } catch {}
    };

    fetchmovie();
  }, [id]);

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
      {moviedata && moviedata.length > 0 ? (
        moviedata.map(data => (
          <div key={data.id}>
            <h3>{title}</h3>
            <p>개봉일 : {releaseDate}</p>
            <p>관객 평점 : {vote_average}</p>
            <p>인기도 : {popularity}</p>
            <Col xs={12}>
              <iframe
                width="80%"
                height="360vh"
                src={`https://www.youtube.com/embed/${data.key}`}
                title={data.name}
                frameBorder="0"
                allowFullScreen
                style={{maxWidth: '100%'}}
              />
            </Col>

            <br />

            <Col xs={12} className="text-left">
              <p>{overview}</p>
            </Col>
          </div>
        ))
      ) : (
        <App_loading />
      )}
    </Container>
  );
}
