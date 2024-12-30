import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMovieSearch} from '../../redux/slices/movieSlice';
import {Link} from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export default function App_search() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {filterList} = useSelector(state => state.movieKey);

  const handleSearch = () => {
    dispatch(setMovieSearch(search));
  };

  const searchShow = filterList.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Container>
      <Row className="p-5 rounded text-center">
        <Col>
          <h1 className="display-4">ConanWiKi</h1>
          <p className="lead">명탐정 코난을 소개하는 위키</p>

          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="궁금한 걸 검색해보세요"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                dispatch(setMovieSearch(e.target.value));
              }}
            />
            <Button variant="primary" onClick={handleSearch}>
              검색
            </Button>
          </InputGroup>

          <div>
            {search && searchShow.length > 0 ? (
              <Row>
                {searchShow.map(movie => (
                  <Col key={movie.id} xs={6} sm={4} md={4} lg={3} xl={3}>
                    <Link
                      to={`/movie/${movie.id}`}
                      state={{
                        overview: movie.overview,
                        release_date: movie.release_date,
                        title: movie.title,
                        vote_average: movie.vote_average,
                        popularity: movie.popularity,
                      }}>
                      <Card style={{width: '100%'}} id={movie.id}>
                        <div style={{overflow: 'hidden'}}>
                          <Card.Img
                            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                            alt={movie.title}
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
                              ? movie.title.slice(0, 10) + '...'
                              : movie.title}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            ) : search ? (
              <p>검색 결과가 없습니다.</p>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
