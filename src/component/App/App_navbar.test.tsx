import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import store from '../../redux/store';

import App_navbar from './App_navbar';

// 공통 렌더 함수
function renderWithProviders(ui: React.ReactElement, route: string = '/') {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );
}

describe('App_navbar Component', () => {
  test('네비게이션 바가 렌더링된다', () => {
    renderWithProviders(<App_navbar />);

    // 네비게이션 컴포넌트가 존재하는지
    expect(screen.getByTestId('app-navbar')).toBeInTheDocument();
  });

  test('로고 또는 타이틀이 렌더링된다', () => {
    renderWithProviders(<App_navbar />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  test('메뉴 버튼들이 렌더링된다', () => {
    renderWithProviders(<App_navbar />);

    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
