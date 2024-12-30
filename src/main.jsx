import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './redux/store';
import Ch_list from './component/character/ch_list';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Mo_list from './component/movie/Mo_list';
import Mo_detail from './component/movie/Mo_detail';
import Home from './component/Home';
import App_navbar from './component/App/App_navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './mainStyle.css';
import Ep_list from './component/episode/Ep_list';
import App_bottom from './component/App/App_bottom';
import App_search from './component/App/App_search';

const App = () => {
  const location = useLocation(); // useLocation 훅을 사용
  const showSearch =
    location.pathname === '/' ||
    location.pathname === '/character' ||
    location.pathname === '/movie';

  return (
    <>
      <App_navbar />
      {showSearch && <App_search />} {/* 조건부 렌더링 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character" element={<Ch_list />} />
        <Route path="/movie" element={<Mo_list />} />
        <Route path="/movie/:id" element={<Mo_detail />} />
        <Route path="/episodes" element={<Ep_list />} />
      </Routes>
      <App_bottom />
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App /> {/* App 컴포넌트를 감싸서 렌더링 */}
      </Router>
    </Provider>
  </StrictMode>,
);
