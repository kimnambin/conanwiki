'use client';

import {useMemo, useState} from 'react';
import {Container, Row, Col, Form, InputGroup} from 'react-bootstrap';
import MovieHeroCard from './MovieHeroCard';
import ToggleSwitch from '../common/ToggleSwitch';
import {MovieType} from '../../types/api.model';
import {getMovieSeasonMap} from '../../utils/movieOrder';
import {getAvailableGenres} from '../../utils/movieGenre';
import '../common/HeroCard.css';

type MovieSort = 'release_date' | 'vote_average' | 'popularity';

const ALL_GENRES = '__all__';

interface MovieBrowserProps {
  movies: MovieType[];
}

// 극장판 목록의 정렬 토글(개봉순/평점순/인기순)과 장르 필터를 담당하는
// 클라이언트 컴포넌트. 목록 데이터 자체는 서버 컴포넌트(movies/page.tsx)가
// TMDB에서 미리 읽어 내려준다.
export default function MovieBrowser({movies}: MovieBrowserProps) {
  const [sortMovie, setSortMovie] = useState<MovieSort>('release_date');
  const [selectedGenre, setSelectedGenre] = useState(ALL_GENRES);

  const seasonMap = useMemo(() => getMovieSeasonMap(movies), [movies]);
  const availableGenres = useMemo(() => getAvailableGenres(movies), [movies]);

  const genreFiltered =
    selectedGenre === ALL_GENRES
      ? movies
      : movies.filter(movie =>
          (movie.genre_ids ?? []).includes(Number(selectedGenre)),
        );

  const sortShow = [...genreFiltered].sort((a, b) => {
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
      <Row className="justify-content-center mt-3">
        <Col xs={12} sm={8} md={6} lg={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text>장르</InputGroup.Text>
            <Form.Select
              value={selectedGenre}
              onChange={e => setSelectedGenre(e.target.value)}>
              <option value={ALL_GENRES}>전체 장르</option>
              {availableGenres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
      {sortShow.length === 0 && <p>해당 장르의 극장판이 없습니다.</p>}
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
