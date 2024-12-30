import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {IoMdArrowDropupCircle} from 'react-icons/io';

const NavButton = styled.button`
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: ${props => (props.$visible ? 'flex' : 'none')};
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 2000;
`;

const Picon = styled.p`
  font-size: 50px;
  text-align: center;
  margin: 0;
`;

export default function App_bottom() {
  const [visible, setVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <NavButton $visible={visible} onClick={scrollTop}>
      <Picon>
        <IoMdArrowDropupCircle />
      </Picon>
    </NavButton>
  );
}
