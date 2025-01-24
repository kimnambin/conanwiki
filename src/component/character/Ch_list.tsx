import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {character} from '../../redux/slices/characterSlice';
import Ch_detail from './Ch_detail';
import Ch_couple from './Ch_couple';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Ch_nav from './Ch_nav';
import App_loading from '../App/App_loading';
import {ArrayType, CharacherType, CharacterState} from '../../types/api';
import {StoreDispatch} from '../../redux/store';

export default function Ch_list() {
  const dispatch = useDispatch<StoreDispatch>();
  const {list, loading, error}: CharacterState = useSelector(
    (state: ArrayType) => state.characterKey,
  );

  const [openDetail, setOpenDetail] = useState(false);
  const [select, setSelect] = useState<CharacherType | null>(null);

  useEffect(() => {
    dispatch(character());
  }, [dispatch]);

  const open = (arg: CharacherType) => {
    // console.log('클릭됨', id);
    // console.log('모달창여부', openDetail);
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
      // console.log('클릭 됨');
    } else {
      // console.log('coupleScroll 요소를 찾을 수 없습니다.');
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
              xl={3}>
              <Card style={{width: '100%'}} onClick={() => open(item)}>
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
