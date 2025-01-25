import {Link} from 'react-router-dom';
import './home.css';
import {useDispatch, useSelector} from 'react-redux';
import {character} from '../redux/slices/characterSlice';
import {fetchMovie} from '../redux/slices/movieSlice';
import {useEffect} from 'react';
import {ArrayType} from '../types/api';
import {StoreDispatch} from '../redux/store';
import {Container, Row, Col, Card} from 'react-bootstrap';

export default function Home() {
  const dispatch = useDispatch<StoreDispatch>();
  const {list, loading, error} = useSelector(
    (state: ArrayType) => state.characterKey,
  );
  const {movieList} = useSelector((state: ArrayType) => state.movieKey);

  useEffect(() => {
    dispatch(character());
    dispatch(fetchMovie());
  }, [dispatch]);

  return (
    <Container fluid className="text-center bg-light">
      <Row className="slideanim">
        <Col md={4} className="mb-4">
          <Link to="/conanwiki/character" className="text-decoration-none">
            <Card>
              <Card.Img
                variant="top"
                src="/conanwiki/conancha.webp"
                alt="캐릭터"
              />
              <Card.Body>
                <Card.Title>등장인물</Card.Title>
                <Card.Text>명탐정 코난 등장인물 모음</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="mb-4">
          <Link to="/conanwiki/movie" className="text-decoration-none">
            <Card>
              <Card.Img
                variant="top"
                src="/conanwiki/conanMo_11zon.webp"
                alt="극장판"
              />
              <Card.Body>
                <Card.Title>극장판</Card.Title>
                <Card.Text>명탐정 코난 극장판 모음</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="mb-4">
          <Link to="/conanwiki/episodes" className="text-decoration-none">
            <Card>
              <Card.Img
                variant="top"
                src="/conanwiki/conanEpi_11zon.webp"
                alt="에피소드"
              />
              <Card.Body>
                <Card.Title>에피소드</Card.Title>
                <Card.Text>명탐정 코난 중요 에피소드 모음</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
