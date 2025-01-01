import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMovieSearch} from '../../redux/slices/movieSlice';
import {Link} from 'react-router-dom';
import {setSearchText} from '../../redux/slices/characterSlice';
import Ch_detail from '../character/Ch_detail';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function App_search() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {filtermovieList} = useSelector(state => state.movieKey);
  const {searchList} = useSelector(state => state.characterKey);

  const handleSearch = () => {
    dispatch(setMovieSearch(search));
    dispatch(setSearchText(search));
  };

  const searchShow = filtermovieList.filter(movie =>
    movie.title.includes(search),
  );

  const searchCharacter = searchList.filter(find =>
    find.name.korean.name.includes(search),
  );

  const [openDetail, setOpenDetail] = useState(false);
  const [select, setSelect] = useState(null);

  const open = id => {
    // console.log('클릭됨', id);
    // console.log('모달창여부', openDetail);
    setSelect(id);
    setOpenDetail(true);
  };

  const close = () => {
    setSelect(null);
    setOpenDetail(false);
  };

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
            {/* 영화 검색 결과 */}
            {search && searchShow.length > 0 && (
              <div>
                <h3>영화 검색 결과</h3>
                <Row>
                  {searchShow.map(movie => (
                    <Col key={movie.id} xs={6} sm={4} md={4} lg={3}>
                      <Link
                        to={`/conanwiki/movie/${movie.id}`}
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
              </div>
            )}

            {/* 캐릭터 검색 결과 */}
            <Ch_detail open={openDetail} close={close} character={select} />
            {search && searchCharacter.length > 0 && (
              <div>
                <h3>캐릭터 검색 결과</h3>
                <Row>
                  {searchCharacter.map(item => (
                    <Col
                      key={item.name.english.anime}
                      xs={6}
                      sm={4}
                      md={4}
                      lg={3}
                      xl={3}>
                      <Card style={{width: '100%'}} onClick={() => open(item)}>
                        <div style={{height: '120px', overflow: 'hidden'}}>
                          <Card.Img
                            variant="mid"
                            src={item.imgage}
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
                            {item.name.korean.name.length > 10
                              ? item.name.korean.name.slice(0, 10) + '...'
                              : item.name.korean.name}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* 검색 결과가 없을 경우 */}
            {search &&
              searchShow.length === 0 &&
              searchCharacter.length === 0 && <p>검색 결과가 없습니다.</p>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
