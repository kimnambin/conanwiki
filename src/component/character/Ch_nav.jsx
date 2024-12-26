import React from 'react';
import {Dropdown} from 'react-bootstrap';
import styled from 'styled-components';

const Navbottom = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export default function Ch_nav({scrollTop, scrollBottom}) {
  return (
    <Navbottom>
      <Dropdown drop="up">
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          style={{backgroundColor: '#00a495'}}>
          목록
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={scrollTop}>캐릭터 보러가기</Dropdown.Item>
          <Dropdown.Item onClick={scrollBottom}>커플 보러가기</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbottom>
  );
}
