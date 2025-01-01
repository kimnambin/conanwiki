//

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovie} from '../../redux/slices/movieSlice';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import App_loading from '../App/App_loading';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Mo_movieList() {
  const dispatch = useDispatch();
  const {movieList, error, loading} = useSelector(state => state.movieKey);

  const [sortMovie, setSortMovie] = useState('release_date');

  const sortChange = id => {
    setSortMovie(id);
  };

  const selectSort = id => {
    switch (id) {
      case 'release_date':
        return '개봉순';
      case 'vote_average':
        return '평점순';
      case 'popularity':
        return '인기순';
      default:
        return '';
    }
  };

  const sortShow = [...movieList].sort((a, b) => {
    if (sortMovie === 'release_date') {
      return new Date(a.release_date) - new Date(b.release_date);
    } else if (sortMovie === 'vote_average') {
      return b.vote_average - a.vote_average;
    } else if (sortMovie === 'popularity') {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(fetchMovie());
    // console.log(movieList);
  }, [dispatch]);

  if (loading) return <App_loading />;
  if (error) return <p>에러...</p>;

  return (
    <Container className="text-center">
      <h2>명탐정 코난 극장판 모음</h2>
      <br />
      <Nav className="d-flex justify-content-center" align="center">
        <NavDropdown title={selectSort(sortMovie)} menuVariant="light">
          <NavDropdown.Item onClick={() => sortChange('release_date')}>
            개봉순
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => sortChange('vote_average')}>
            평점순
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => sortChange('popularity')}>
            인기순
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <br />
      <br />
      <Row className="g-3">
        {sortShow.map((movie, index) => (
          <Col key={index} xs={6} sm={4} md={4} lg={3} xl={3}>
            <Link
              to={`/movie/${movie.id}`}
              state={{
                overview: movie.overview,
                release_date: movie.release_date,
                title: movie.title,
                vote_average: movie.vote_average,
                popularity: movie.popularity,
              }}>
              <Card style={{width: '100%'}} id={index}>
                <div style={{overflow: 'hidden'}}>
                  <Card.Img
                    variant="mid"
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt=""
                    style={{
                      height: '130%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Text>
                    {movie.title.length > 10
                      ? `<${index + 1}기>` + movie.title.slice(7, 17) + '...'
                      : movie.title(7)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
