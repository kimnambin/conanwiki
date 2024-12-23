import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div>
      홈입니다용
      <Link to="/character">
        <p>캐릭터 보러가기</p>
      </Link>
      <Link to="/movie">
        <p>영화화 보러가기</p>
      </Link>
    </div>
  );
}
