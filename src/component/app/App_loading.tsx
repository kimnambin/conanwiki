import {Container, Col, Spinner, Row} from 'react-bootstrap';

export default function App_loading() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{height: '100vh'}}>
      <Row className="justify-content-center text-center">
        <Col>
          <img src="/conanwiki/kids.webp" alt="로딩 이미지" className="mb-3" />
          <Spinner animation="grow" />
        </Col>
      </Row>
    </Container>
  );
}
