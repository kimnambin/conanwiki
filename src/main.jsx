import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './redux/store';
import Ch_list from './component/character/ch_list';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Mo_list from './component/movie/Mo_list';
import Mo_detail from './component/movie/Mo_detail';
import Home from './component/Home';
import App_navbar from './component/App_navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './mainStyle.css';
import Ep_list from './component/episode/ep_list';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App_navbar />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<Ch_list />} />
          <Route path="/movie" element={<Mo_list />} />
          <Route path="/movie/:id" element={<Mo_detail />} />
          <Route path="/episodes" element={<Ep_list />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
);
