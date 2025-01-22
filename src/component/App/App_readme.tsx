import {Modal} from 'react-bootstrap';
import style from './App.module.css';
import {ReadmeType} from '../../types/component';

export default function App_readme({
  openReadme,
  openRead,
  closeRead,
}: ReadmeType) {
  if (!openRead) return null;

  return (
    <Modal
      show={openReadme}
      onHide={closeRead}
      centered
      className={style.contanier}>
      <Modal.Header closeButton>
        <Modal.Title>README</Modal.Title>
      </Modal.Header>
      <Modal.Body className={style.readmeModal}>
        <div className={style.credits}>
          <h3>명탐정 코난을 소개하는 위키</h3>
          <h4>
            명탐정 코난 팬으로서 캐릭터, 극장판, 에피소드 정보를 제공하기 위해
            만들어봤습니다.
          </h4>
          <hr />
          <h3>사용 기술</h3>
          <p>ReactJS</p>
          <p>JavaScript</p>
          <p>Redux</p>
          <p>Redux Toolkit</p>
          <hr />
          <h3>설치 패키지</h3>
          <p>@reduxjs/toolkit</p>
          <p>react-redux</p>
          <p>react-router-dom</p>
          <p>react-bootstrap</p>
          <p>react-icons</p>
          <p>styled-components</p>
          <hr />
          <h3>참고 사이트</h3>
          <fieldset>
            <legend>이미지</legend>
            <p>
              - 코난 아이콘:{' '}
              <a href="https://www.pngegg.com/ko/png-fwywf">링크</a>
            </p>
            <p>
              - 등장인물 이미지:{' '}
              <a href="https://blog.naver.com/danteknight/140163009249?photoView=62">
                링크
              </a>
            </p>
            <p>
              - 극장판 이미지:{' '}
              <a href="https://dh.aks.ac.kr/Edu/wiki/index.php/%EB%AA%85%ED%83%90%EC%A0%95_%EC%BD%94%EB%82%9C">
                링크
              </a>
            </p>
            <p>
              - 에피소드 이미지:{' '}
              <a href="https://www.animaxtv.co.kr/content/342">링크</a>
            </p>
          </fieldset>
          <hr />
          <fieldset>
            <legend>API</legend>
            <p>
              <a href="https://github.com/lethargilistic/dcapi">
                https://github.com/lethargilistic/dcapi
              </a>
            </p>
            <p>
              <a href="https://m.blog.naver.com/116sun116/221952894209">
                블로거 "멍멍식"님
              </a>
            </p>
            <p>
              <a href="https://www.themoviedb.org/?language=ko">TBDB</a>
            </p>
          </fieldset>
        </div>
      </Modal.Body>
    </Modal>
  );
}
