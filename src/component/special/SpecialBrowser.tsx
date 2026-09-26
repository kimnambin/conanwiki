'use client';

import {useState} from 'react';
import {Container, Row, Col, Form, InputGroup} from 'react-bootstrap';
import SpecialHeroCard from './SpecialHeroCard';
import ToggleSwitch from '../common/ToggleSwitch';
import {SpecialCategory, SpecialType} from '../../types/api.model';
import {
  filterSpecialsByCategory,
  SPECIAL_CATEGORIES,
  sortSpecialsByRelease,
  SpecialOrder,
} from '../../utils/specialCategory';
import '../common/HeroCard.css';

const ALL_CATEGORIES = '__all__';

interface SpecialBrowserProps {
  specials: SpecialType[];
}

// 콜라보/TV 스페셜/총집편 목록의 정렬 토글(개봉순/최신순)과 분류 필터를 담당하는
// 클라이언트 컴포넌트. 극장판 목록(MovieBrowser)과 같은 구성이다.
export default function SpecialBrowser({specials}: SpecialBrowserProps) {
  const [order, setOrder] = useState<SpecialOrder>('asc');
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const filtered = filterSpecialsByCategory(
    specials,
    selectedCategory === ALL_CATEGORIES
      ? null
      : (selectedCategory as SpecialCategory),
  );
  const sorted = sortSpecialsByRelease(filtered, order);

  return (
    <Container className="text-center mt-5">
      <h2>명탐정 코난 콜라보 · TV 스페셜 · 총집편</h2>
      <ToggleSwitch
        value={order}
        onChange={setOrder}
        options={[
          {value: 'asc', label: '개봉순'},
          {value: 'desc', label: '최신순'},
        ]}
      />
      <Row className="justify-content-center mt-3">
        <Col xs={12} sm={8} md={6} lg={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text>분류</InputGroup.Text>
            <Form.Select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}>
              <option value={ALL_CATEGORIES}>전체 분류</option>
              {SPECIAL_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
      {sorted.length === 0 && <p>해당 분류의 작품이 없습니다.</p>}
      <Row className="g-3">
        {sorted.map(special => (
          <Col
            key={special.slug}
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            className="hero-card-col d-flex justify-content-center align-items-center">
            <SpecialHeroCard special={special} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
