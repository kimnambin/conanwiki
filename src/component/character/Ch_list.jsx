import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {character, characterDetail} from '../../redux/slices/characterSlice';
import Ch_detail from './Ch_detail';
import Ch_couple from './Ch_couple';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Ch_list() {
  const dispatch = useDispatch();
  const {list, loading, error} = useSelector(state => state.characterKey);

  const [openDetail, setOpenDetail] = useState(false);
  const [select, setSelect] = useState(null);

  useEffect(() => {
    dispatch(character());
  }, [dispatch]);

  const open = id => {
    console.log('클릭됨', id);
    console.log('모달창여부', openDetail);
    setSelect(id);
    setOpenDetail(true);
  };

  const close = () => {
    setSelect(null);
    setOpenDetail(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>에러...</p>;

  return (
    <Container className="text-center">
      <h2>명탐정 코난 등장인물</h2>
      <p>https://github.com/lethargilistic/dcapi을 참고했어요</p>
      <br />
      <Ch_detail open={openDetail} close={close} character={select} />
      <Row className="g-3">
        {[...list]
          .sort((a, b) => a.name.korean.name.localeCompare(b.name.korean.name))
          .map(item => (
            <Col
              key={item.name.english.anime}
              xs={3}
              sm={3}
              md={2}
              lg={2}
              xl={2}>
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
      <br /> <br />
      <Ch_couple />
    </Container>
  );
}

{
  /* <Dropdown drop="up">
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    드롭다운 메뉴
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">액션 1</Dropdown.Item>
    <Dropdown.Item href="#/action-2">액션 2</Dropdown.Item>
    <Dropdown.Item href="#/action-3">액션 3</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>; */
}
