import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {coupleGet} from '../../redux/slices/characterSlice';
import {Container, Row, Col, Table} from 'react-bootstrap';

export default function Ch_couple() {
  const dispatch = useDispatch();
  const {coupleList, loading, error} = useSelector(state => state.characterKey);

  useEffect(() => {
    if (!coupleList.length) {
      dispatch(coupleGet());
    }
  }, [dispatch, coupleList]); //무한 루프가 되던 문제를 해결

  if (loading) return <p>Loading...</p>;
  if (error) return <p>에러...</p>;

  return (
    <Container>
      <h2>명탐정 코난 커플 모음🩷</h2>
      <Row>
        {coupleList.map((v, index) => (
          <Col md={6} key={v.man} className="mb-4">
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td style={{width: '50%', height: '150px'}}>
                    <img
                      src={v.man_url}
                      style={{
                        height: '150px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                  <td style={{width: '50%', height: '150px'}}>
                    <img
                      src={v.women_url}
                      style={{
                        height: '150px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{textAlign: 'center'}}>
                    {v.man} 🩷 {v.women}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
