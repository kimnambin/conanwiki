import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {StoreDispatch} from '../redux/store';
import {ArrayType, CharacherType, CharacterState} from '../types/api.model';
import {character} from '../redux/slices/characterSlice';
import App_loading from '../component/app/App_loading';
import Ch_nav from '../component/character/Ch_nav';
import Ch_detail from '../component/character/Ch_detail';
import Ch_couple from '../component/character/Ch_couple';

export default function CharacterPage() {
  const dispatch = useDispatch<StoreDispatch>();
  const {list, loading, error}: CharacterState = useSelector(
    (state: ArrayType) => state.characterKey,
  );

  const [openDetail, setOpenDetail] = useState(false);
  const [select, setSelect] = useState<CharacherType | null>(null);
  const isMobile = window.innerWidth;

  useEffect(() => {
    dispatch(character());
  }, [dispatch]);

  const open = (arg: CharacherType) => {
    setSelect(arg);
    setOpenDetail(true);
  };

  const close = () => {
    setSelect(null);
    setOpenDetail(false);
  };

  const characherScroll = () => {
    const chEle = document.getElementById('characherScroll');
    if (chEle) {
      chEle.scrollIntoView({behavior: 'smooth'});
    }
  };

  const coupleScroll = () => {
    const coupleEle = document.getElementById('coupleScroll');
    if (coupleEle) {
      coupleEle.scrollIntoView({behavior: 'smooth'});
    }
  };

  if (loading) return <App_loading />;
  if (error) return <p>에러...</p>;

  return (
    <Container className="text-center">
      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <h2>명탐정 코난 등장인물</h2>
        </div>
        <div className="col-auto">
          <Ch_nav scrollTop={characherScroll} scrollBottom={coupleScroll} />
        </div>
      </div>
      <p>https://github.com/lethargilistic/dcapi을 참고했어요</p>
      <br />
      <Ch_detail open={openDetail} close={close} character={select} />
      <Row className="g-3" id="characherScroll">
        {[...list]
          .sort((a, b) => a.name.korean.name.localeCompare(b.name.korean.name))
          .map(item => (
            <Col
              key={item.name.english.anime}
              xs={6}
              sm={4}
              md={4}
              lg={3}
              xl={3}
              className="d-flex justify-content-center align-items-center">
              <Card style={{width: '80%'}} onClick={() => open(item)}>
                <div style={{height: '120px', overflow: 'hidden'}}>
                  <Card.Img
                    variant="mid"
                    src={item.img}
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
                    {isMobile > 768
                      ? item.name.korean.name.length > 6
                        ? item.name.korean.name.slice(0, 6) + '...'
                        : item.name.korean.name
                      : item.name.korean.name.length > 10
                      ? item.name.korean.name.slice(0, 10) + '...'
                      : item.name.korean.name}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <Ch_couple />
    </Container>
  );
}
