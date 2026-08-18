'use client';

import {useMemo, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Ch_detail from '../character/Ch_detail';
import CharacterHeroCard from '../character/CharacterHeroCard';
import MovieHeroCard from '../movie/MovieHeroCard';
import {CharacherType, MovieType} from '../../types/api.model';
import {getMovieSeasonMap} from '../../utils/movieOrder';
import '../common/HeroCard.css';
import './App_search.css';

interface SearchBarProps {
  characters: CharacherType[];
  movies: MovieType[];
}

// 메인 화면 히어로 + 실시간 검색. 캐릭터/영화 목록은 서버 컴포넌트가
// 미리 읽어 props로 내려주고, 검색 자체는 순수 클라이언트 상호작용이다.
export default function SearchBar({characters, movies}: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [select, setSelect] = useState<CharacherType | null>(null);

  const seasonMap = useMemo(() => getMovieSeasonMap(movies), [movies]);

  const trimmed = search.trim();

  const searchShow = trimmed
    ? movies.filter(movie => movie.title.includes(trimmed))
    : [];

  const searchCharacter = trimmed
    ? characters.filter(item => item.name.korean.name.includes(trimmed))
    : [];

  const open = (item: CharacherType) => {
    setSelect(item);
    setOpenDetail(true);
  };

  const close = () => {
    setSelect(null);
    setOpenDetail(false);
  };

  return (
    <>
      <div className="home-hero">
        <h1 className="home-hero__title">
          Conan<span>Wiki</span>
        </h1>
        <p className="home-hero__tagline">명탐정 코난을 소개하는 위키</p>

        <div className="home-hero__search">
          <input
            type="text"
            placeholder="등장인물이나 극장판을 검색해 보세요"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Container>
        {trimmed !== '' && searchShow.length > 0 && (
          <div className="text-center">
            <span className="search-section-title">영화 검색 결과</span>
            <Row className="g-3 justify-content-center">
              {searchShow.map(movie => (
                <Col
                  key={movie.id}
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  className="hero-card-col d-flex justify-content-center align-items-center">
                  <MovieHeroCard
                    movie={movie}
                    season={seasonMap.get(movie.id)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}

        <Ch_detail open={openDetail} close={close} character={select} />
        {trimmed !== '' && searchCharacter.length > 0 && (
          <div className="text-center">
            <span className="search-section-title">캐릭터 검색 결과</span>
            <Row className="g-3 justify-content-center">
              {searchCharacter.map(item => (
                <Col
                  key={item.name.english.anime}
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className="hero-card-col d-flex justify-content-center align-items-center">
                  <CharacterHeroCard
                    character={item}
                    onClick={() => open(item)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}

        {trimmed !== '' &&
          searchShow.length === 0 &&
          searchCharacter.length === 0 && (
            <p className="text-center">검색 결과가 없습니다.</p>
          )}
      </Container>
    </>
  );
}
