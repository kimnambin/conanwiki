import React from 'react';
import {Container, Col, Spinner, Row} from 'react-bootstrap';

export default function App_loading() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center">
          <img
            src="../../kids.webp"
            alt="로딩 이미지"
            style={{width: '100%', height: 'auto'}}
          />
          <Spinner animation="grow" />
        </Col>
      </Row>
    </Container>
  );
}
