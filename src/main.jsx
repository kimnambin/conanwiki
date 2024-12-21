import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './redux/store';
import Ch_list from './component/character/ch_list';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Ch_list />
    </Provider>
  </StrictMode>,
);
