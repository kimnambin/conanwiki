'use client';

import {useMemo, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import MovieHeroCard from './MovieHeroCard';
import ToggleSwitch from '../common/ToggleSwitch';
import {MovieType} from '../../types/api.model';
import {getMovieSeasonMap} from '../../utils/movieOrder';
import '../common/HeroCard.css';

type MovieSort = 'release_date' | 'vote_average' | 'popularity';

interface MovieBrowserProps {
  movies: MovieType[];
}

// 극장판 목록의 정렬 토글(개봉순/평점순/인기순)을 담당하는 클라이언트 컴포넌트.
// 목록 데이터 자체는 서버 컴포넌트(movies/page.tsx)가 TMDB에서 미리 읽어 내려준다.
export default function MovieBrowser({movies}: MovieBrowserProps) {
  const [sortMovie, setSortMovie] = useState<MovieSort>('release_date');

  const seasonMap = useMemo(() => getMovieSeasonMap(movies), [movies]);

  const sortShow = [...movies].sort((a, b) => {
    if (sortMovie === 'release_date') {
      return (
        new Date(a.release_date).getTime() -
        new Date(b.release_date).getTime()
      );
    } else if (sortMovie === 'vote_average') {
      return b.vote_average - a.vote_average;
    } else if (sortMovie === 'popularity') {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  return (
    <Container className="text-center mt-5">
      <h2>명탐정 코난 극장판 모음</h2>
      <ToggleSwitch
        value={sortMovie}
        onChange={setSortMovie}
        options={[
          {value: 'release_date', label: '개봉순'},
          {value: 'vote_average', label: '평점순'},
          {value: 'popularity', label: '인기순'},
        ]}
      />
      <br />
      <Row className="g-3">
        {sortShow.map((movie, idx) => (
          <Col
            key={movie.id}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            className="hero-card-col d-flex justify-content-center align-items-center">
            <MovieHeroCard
              movie={movie}
              season={seasonMap.get(movie.id)}
              rank={
                sortMovie !== 'release_date' && idx < 5 ? idx + 1 : undefined
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
