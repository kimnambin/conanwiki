import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GemHint from './GemHint';

function renderGemHint() {
  return render(
    <GemHint className="test-gem" title="나이" description="7세예요.">
      7
    </GemHint>,
  );
}

describe('GemHint', () => {
  it('평소에는 설명 말풍선이 보이지 않는다', () => {
    renderGemHint();
    expect(screen.queryByText('7세예요.')).not.toBeInTheDocument();
  });

  it('마우스를 올리면 말풍선이 뜨고, 벗어나면 사라진다', async () => {
    const user = userEvent.setup();
    renderGemHint();
    const badge = screen.getByRole('button', {name: '나이'});

    await user.hover(badge);
    expect(screen.getByText('7세예요.')).toBeInTheDocument();

    await user.unhover(badge);
    expect(screen.queryByText('7세예요.')).not.toBeInTheDocument();
  });

  it('Enter/Space 키로 말풍선을 토글할 수 있다', async () => {
    const user = userEvent.setup();
    renderGemHint();
    const badge = screen.getByRole('button', {name: '나이'});

    badge.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('7세예요.')).toBeInTheDocument();

    await user.keyboard('{Enter}');
    expect(screen.queryByText('7세예요.')).not.toBeInTheDocument();
  });

  it('바깥을 클릭하면 말풍선이 닫힌다', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <GemHint className="test-gem" title="나이" description="7세예요.">
          7
        </GemHint>
        <button type="button">바깥 버튼</button>
      </div>,
    );
    const badge = screen.getByRole('button', {name: '나이'});

    await user.click(badge);
    expect(screen.getByText('7세예요.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: '바깥 버튼'}));
    expect(screen.queryByText('7세예요.')).not.toBeInTheDocument();
  });
});
