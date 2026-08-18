'use client';

import {useMemo, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {CharacherType, CoupleType} from '../../types/api.model';
import Ch_detail from './Ch_detail';
import Ch_couple from './Ch_couple';
import CharacterHeroCard from './CharacterHeroCard';
import {CHARACTER_TYPES, getCharacterType} from '../../utils/characterType';
import ToggleSwitch from '../common/ToggleSwitch';
import '../common/HeroCard.css';

const ALL_AFFILIATIONS = '__all__';

type ViewMode = 'character' | 'couple';

interface CharacterBrowserProps {
  characters: CharacherType[];
  couples: CoupleType[];
}

// 캐릭터/커플 목록의 검색·필터·토글·상세 모달을 담당하는 클라이언트 컴포넌트.
// 목록 데이터 자체는 서버 컴포넌트(characters/page.tsx)가 미리 읽어 props로 내려준다.
export default function CharacterBrowser({
  characters,
  couples,
}: CharacterBrowserProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const [select, setSelect] = useState<CharacherType | null>(null);
  const [keyword, setKeyword] = useState('');
  const [selectedAffiliation, setSelectedAffiliation] =
    useState(ALL_AFFILIATIONS);
  const [view, setView] = useState<ViewMode>('character');

  const open = (arg: CharacherType) => {
    setSelect(arg);
    setOpenDetail(true);
  };

  const close = () => {
    setSelect(null);
    setOpenDetail(false);
  };

  // 소속(affiliation) 원문 값을, 카드 배경/원형 뱃지에 쓰는 타입별로 묶어
  // 필터 드롭다운의 optgroup으로 사용한다.
  const affiliationsByType = useMemo(() => {
    const map = new Map<string, Set<string>>();
    characters.forEach(item => {
      (item.affiliation ?? []).forEach(aff => {
        const type = getCharacterType([aff]);
        if (!map.has(type.key)) map.set(type.key, new Set());
        map.get(type.key)!.add(aff);
      });
    });
    return map;
  }, [characters]);

  const trimmedKeyword = keyword.trim();

  const filteredList = [...characters]
    .sort((a, b) => a.name.korean.name.localeCompare(b.name.korean.name))
    .filter(
      item =>
        trimmedKeyword === '' ||
        item.name.korean.name.includes(trimmedKeyword) ||
        item.name.english.anime
          .toLowerCase()
          .includes(trimmedKeyword.toLowerCase()),
    )
    .filter(
      item =>
        selectedAffiliation === ALL_AFFILIATIONS ||
        (item.affiliation ?? []).includes(selectedAffiliation),
    );

  return (
    <Container className="text-center">
      <div className="row align-items-center justify-content-center mt-5">
        <div className="col-auto">
          <h2>
            {view === 'character'
              ? '명탐정 코난 등장인물'
              : '명탐정 코난 커플 모음🩷'}
          </h2>
        </div>
      </div>
      <ToggleSwitch
        value={view}
        onChange={setView}
        options={[
          {value: 'character', label: '👤 캐릭터'},
          {value: 'couple', label: '🩷 커플'},
        ]}
      />
      {view === 'character' && (
        <>
          <p>https://github.com/lethargilistic/dcapi을 참고했어요</p>
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6} lg={4}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="이름으로 검색"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={12} sm={8} md={6} lg={4}>
              <InputGroup className="mb-3">
                <InputGroup.Text>소속</InputGroup.Text>
                <Form.Select
                  value={selectedAffiliation}
                  onChange={e => setSelectedAffiliation(e.target.value)}>
                  <option value={ALL_AFFILIATIONS}>전체 소속</option>
                  {CHARACTER_TYPES.filter(type =>
                    affiliationsByType.has(type.key),
                  ).map(type => (
                    <optgroup
                      key={type.key}
                      label={`${type.icon} ${type.label}`}>
                      {[...(affiliationsByType.get(type.key) ?? [])]
                        .sort((a, b) => a.localeCompare(b))
                        .map(aff => (
                          <option key={aff} value={aff}>
                            {aff}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
          <Ch_detail open={openDetail} close={close} character={select} />
          {filteredList.length === 0 && <p>검색 결과가 없습니다.</p>}
          <Row className="g-3">
            {filteredList.map(item => (
              <Col
                key={item.name.english.anime}
                xs={6}
                sm={4}
                md={4}
                lg={3}
                xl={3}
                className="hero-card-col d-flex justify-content-center align-items-center">
                <CharacterHeroCard
                  character={item}
                  onClick={() => open(item)}
                />
              </Col>
            ))}
          </Row>
        </>
      )}

      {view === 'couple' && <Ch_couple coupleList={couples} />}
    </Container>
  );
}
