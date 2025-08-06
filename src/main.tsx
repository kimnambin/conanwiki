import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './redux/store';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Mo_detail from './component/movie/Mo_detail';
import Home from './component/Home';
import App_navbar from './component/app/App_navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App_bottom from './component/app/App_bottom';
import App_search from './component/app/App_search';
import App_footer from './component/app/App_footer';
import CharacterPage from './pages/CharacterPage';
import MoviePage from './pages/MoviePage';
import EpisodePage from './pages/EpisodePage';
import App_loading from './component/app/App_loading';

const App = () => {
  const location = useLocation();

  const showSearch =
    location.pathname === '/' ||
    location.pathname === '/conanwiki/' ||
    location.pathname === '/conanwiki/characters' ||
    location.pathname === '/conanwiki/movies';

  return (
    <>
      <App_navbar />
      {showSearch && <App_search />}
      <Suspense fallback={<App_loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conanwiki" element={<Home />} />
          <Route path="/conanwiki/characters" element={<CharacterPage />} />
          <Route path="/conanwiki/movies" element={<MoviePage />} />
          <Route path="/conanwiki/movies/:id" element={<Mo_detail />} />
          <Route path="/conanwiki/episodes" element={<EpisodePage />} />
        </Routes>
      </Suspense>
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
