import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import {MemoryRouter} from 'react-router-dom';
import Home from './Home';

// 공통 렌더링 함수 (Provider + Router 포함)
function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );
}

describe('<Home />', () => {
  test('컴포넌트가 정상적으로 렌더링된다', () => {
    renderWithProviders(<Home />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('필요한 텍스트 또는 버튼이 렌더링된다', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  test('특정 버튼이 존재한다면 렌더링 체크', () => {
    renderWithProviders(<Home />);

    const searchButton = screen.queryByRole('button', {name: /검색/i});
    expect(searchButton).toBeTruthy();
  });
});
