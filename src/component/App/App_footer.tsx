import {Container, Navbar} from 'react-bootstrap';
import style from './App.module.css';
import {useState} from 'react';
import App_readme from './App_readme';

export default function App_footer() {
  const [openReadme, setOpenReadme] = useState(false);

  const openRead = () => {
    setOpenReadme(true);
  };

  const closeRead = () => {
    setOpenReadme(false);
  };

  return (
    <Navbar
      className="navbar navbar-expand-lg navbar-light  sticky-top"
      style={{backgroundColor: '#00a495'}}>
      <App_readme
        openReadme={openReadme}
        openRead={openRead}
        closeRead={closeRead}
      />
      <Container className="row align-items-center justify-content-center">
        <div className="col-auto">
          <p className="text-center m-0">
            © 2024 ConanWiki | All rights reserved.
          </p>
        </div>
        <div className="col-auto">
          <button onClick={openRead}>README</button>
        </div>
      </Container>
    </Navbar>
  );
}
