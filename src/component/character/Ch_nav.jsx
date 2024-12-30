import React from 'react';
import {Dropdown} from 'react-bootstrap';

export default function Ch_nav({scrollTop, scrollBottom}) {
  return (
    <>
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
    </>
  );
}
