import {Link} from 'react-router-dom';
import './home.css';
import {useDispatch} from 'react-redux';
import {character} from '../redux/slices/characterSlice';
import {fetchMovie} from '../redux/slices/movieSlice';
import {useEffect} from 'react';
import {StoreDispatch} from '../redux/store';
import {Container, Row, Col, Card} from 'react-bootstrap';

export default function Home() {
  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(character());
    dispatch(fetchMovie());
  }, [dispatch]);

  return (
    <Container fluid className="text-center bg-light">
      <Row className="slideanim">
        <Col md={4} className="mb-4">
          <Link to="/conanwiki/characters" className="text-decoration-none">
            <Card>
              <div style={{height: '260px', overflow: 'hidden'}}>
                <Card.Img
                  variant="top"
                  src="/conanwiki/conancha.webp"
                  alt="캐릭터"
                  style={{height: '100%', width: '100%', objectFit: 'cover'}}
                />
              </div>
              <Card.Body>
                <Card.Title>등장인물</Card.Title>
                <Card.Text>명탐정 코난 등장인물 모음</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="mb-4">
          <Link to="/conanwiki/movies" className="text-decoration-none">
            <Card>
              <div style={{height: '260px', overflow: 'hidden'}}>
                <Card.Img
                  variant="top"
                  src="/conanwiki/conanMo_11zon.webp"
                  alt="극장판"
                  style={{height: '100%', width: '100%', objectFit: 'cover'}}
                />
              </div>
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
              <div style={{height: '260px', overflow: 'hidden'}}>
                <Card.Img
                  variant="top"
                  src="/conanwiki/conanEpi_11zon.webp"
                  alt="에피소드"
                  style={{height: '100%', width: '100%', objectFit: 'cover'}}
                />
              </div>
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
