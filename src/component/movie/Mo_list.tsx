import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovie} from '../../redux/slices/movieSlice';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Card, Nav, NavDropdown} from 'react-bootstrap';
import App_loading from '../App/App_loading';
import {StoreDispatch} from '../../redux/store';
import {ArrayType} from '../../types/api';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Mo_movieList() {
  const dispatch = useDispatch<StoreDispatch>();
  const {movieList, error, loading} = useSelector(
    (state: ArrayType) => state.movieKey,
  );

  const [sortMovie, setSortMovie] = useState('release_date');

  const sortChange = (id: string) => {
    setSortMovie(id);
  };

  const selectSort = (id: string) => {
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
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
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
      <Nav
        className="d-flex justify-content-center"
        // align="center"
      >
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
              to={`/conanwiki/movie/${movie.id}`}
              state={{
                overview: movie.overview,
                release_date: movie.release_date,
                title: movie.title,
                vote_average: movie.vote_average,
                popularity: movie.popularity,
                image: movie.poster_path,
              }}>
              <Card
                style={{width: '100%', height: '90%'}}
                // id={index}
              >
                <div style={{overflow: 'hidden'}}>
                  <Card.Img
                    variant="mid"
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt=""
                    style={{
                      height: '120%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Text>
                    {movie.title.length > 10
                      ? movie.title.slice(7, 17) + '...'
                      : movie.title.slice(7)}
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
