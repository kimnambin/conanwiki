import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {coupleGet} from '../../redux/slices/characterSlice';
import {Container, Row, Col, Table} from 'react-bootstrap';
import App_loading from '../app/App_loading';
import {CharacterState} from '../../types/api.model';
import {StoreDispatch, RootState} from '../../redux/store';

export default function Ch_couple() {
  const dispatch = useDispatch<StoreDispatch>();
  const {coupleList, loading, error}: CharacterState = useSelector(
    (state: RootState) => state.characterKey,
  );

  useEffect(() => {
    if (!coupleList.length) {
      dispatch(coupleGet());
    }
  }, [dispatch, coupleList]);

  if (loading) return <App_loading />;
  if (error) return <p>에러...</p>;

  return (
    <Container id="coupleScroll" style={{marginTop: '10%'}}>
      <h2>명탐정 코난 커플 모음🩷</h2>
      <Row>
        {coupleList.map(v => (
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
