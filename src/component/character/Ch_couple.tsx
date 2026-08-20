'use client';

import {useMemo, useState} from 'react';
import Image from 'next/image';
import {Container, Row, Col, Form, InputGroup} from 'react-bootstrap';
import {CoupleType} from '../../types/api.model';
import {getCoupleType} from '../../utils/coupleType';
import Ch_coupleDetail from './Ch_coupleDetail';
import './Ch_couple.css';

const ALL_STATUS = '__all__';

interface Ch_coupleProps {
  coupleList: CoupleType[];
}

export default function Ch_couple({coupleList}: Ch_coupleProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const [select, setSelect] = useState<CoupleType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState(ALL_STATUS);

  // 캐릭터 쪽의 "소속" 필터에 대응하는, 커플용 "상태"(미혼/기혼 등) 필터 옵션.
  const statusOptions = useMemo(
    () =>
      [...new Set(coupleList.map(v => v.status).filter((s): s is string => !!s))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [coupleList],
  );

  const open = (couple: CoupleType) => {
    setSelect(couple);
    setOpenDetail(true);
  };

  const close = () => {
    setSelect(null);
    setOpenDetail(false);
  };

  const filteredCoupleList = coupleList.filter(
    v => selectedStatus === ALL_STATUS || v.status === selectedStatus,
  );

  return (
    <Container style={{marginTop: '1%'}}>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text>상태</InputGroup.Text>
            <Form.Select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}>
              <option value={ALL_STATUS}>전체 상태</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
      <Ch_coupleDetail open={openDetail} close={close} couple={select} />
      {filteredCoupleList.length === 0 && <p>해당하는 커플이 없습니다.</p>}
      <Row className="g-3">
        {filteredCoupleList.map(v => {
          const type = getCoupleType(v.relationship_type);
          const cardVars = {
            '--accent': type.accent,
            '--accent-soft': type.accentSoft,
            '--bg-from': type.bgFrom,
            '--bg-to': type.bgTo,
          } as React.CSSProperties;

          return (
            <Col
              key={`${v.man}-${v.women}`}
              xs={6}
              sm={4}
              md={4}
              lg={3}
              xl={3}
              className="couple-card-col d-flex justify-content-center align-items-center">
              <div
                className="couple-card"
                style={cardVars}
                onClick={() => open(v)}>
                <div className="couple-card__portraits">
                  <div className="couple-card__portrait">
                    <Image
                      src={v.man_url}
                      alt={v.man}
                      fill
                      sizes="(max-width: 576px) 25vw, (max-width: 992px) 16vw, 12vw"
                    />
                  </div>
                  <div className="couple-card__portrait">
                    <Image
                      src={v.women_url}
                      alt={v.women}
                      fill
                      sizes="(max-width: 576px) 25vw, (max-width: 992px) 16vw, 12vw"
                    />
                  </div>
                </div>
                <div className="couple-card__divider" />
                <span className="couple-card__heart">{type.icon}</span>
                <div className="couple-card__shade" />
                {v.status && (
                  <span className="couple-card__status-badge">
                    {v.status}
                  </span>
                )}
                <div className="couple-card__name-plate">
                  <div className="couple-card__nickname">
                    {v.couple_nickname || `${v.man} & ${v.women}`}
                  </div>
                  <div className="couple-card__names">
                    {v.man} 🩷 {v.women}
                  </div>
                  <div className="couple-card__type-label">{type.label}</div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
