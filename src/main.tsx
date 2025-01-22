import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './redux/store';
import Ch_list from './component/character/Ch_list';
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
import App_footer from './component/App/App_footer';

const App = () => {
  const location = useLocation();

  const showSearch =
    location.pathname === '/' ||
    location.pathname === '/conanwiki/' ||
    location.pathname === '/conanwiki/character' ||
    location.pathname === '/conanwiki/movie';

  return (
    <>
      <App_navbar />
      {showSearch && <App_search />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conanwiki" element={<Home />} />
        <Route path="/conanwiki/character" element={<Ch_list />} />
        <Route path="/conanwiki/movie" element={<Mo_list />} />
        <Route path="/conanwiki/movie/:id" element={<Mo_detail />} />
        <Route path="/conanwiki/episodes" element={<Ep_list />} />
      </Routes>
      <App_bottom />
      <App_footer />
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);
