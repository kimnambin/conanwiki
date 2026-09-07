import type {Meta, StoryObj} from '@storybook/react-vite';
import GemHint from './GemHint';

// 행동(호버/클릭/키보드) 테스트는 GemHint.test.tsx(RTL)에서 다룬다.
// @storybook/addon-vitest의 play 렌더러는 현재 hook을 쓰는 컴포넌트의
// 재렌더에서 깨지는 이슈가 있어, 여기서는 정적 스토리만 둔다.
const meta: Meta<typeof GemHint> = {
  title: 'Common/GemHint',
  component: GemHint,
  // @storybook/addon-vitest's play-function test renderer currently breaks
  // on re-render for hook-using components (see GemHint.test.tsx for the
  // real interaction coverage); keep this story visual-only in Vitest.
  tags: ['!test'],
  args: {
    className: 'story-gem',
    title: '나이',
    description: '작중 설정상 나이는 7세예요.',
    children: '7',
  },
  decorators: [
    Story => (
      <div style={{padding: 80, background: '#1a1a1a'}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GemHint>;

export const Default: Story = {};
