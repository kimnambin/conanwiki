import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';
import {CharacterType} from '../../types/api.model';
import CharacterHeroCard from './CharacterHeroCard';
import '../common/HeroCard.css';

const conan: CharacterType = {
  name: {
    korean: {name: '코난 (에도가와 코난)'},
    english: {anime: 'Conan Edogawa'},
    japanese: {kanji: '江戸川 コナン', romanized: 'Conan Edogawa'},
  },
  img: '/conanwiki/img/Conan Edogawa_13_11zon.webp',
  occupation: '테이탄 초등학교 학생',
  age: 7,
  first_appearance: {anime: '만화 에피소드 10'},
  aliases: '은탄환',
  affiliation: ['소년탐정단'],
  namuwikiUrl: 'https://namu.wiki/w/코난',
};

// react-bootstrap의 <Card>가 내부적으로 hook을 쓰는데, 이게
// @storybook/addon-vitest의 재렌더 경로에서 깨지는 이슈가 있어(GemHint.stories.tsx
// 참고) 이 스토리는 시각적 문서화/Chromatic 전용으로만 쓰고 vitest 실행에서는 뺀다.
const meta: Meta<typeof CharacterHeroCard> = {
  title: 'Character/CharacterHeroCard',
  component: CharacterHeroCard,
  tags: ['!test'],
  args: {character: conan, onClick: fn()},
};

export default meta;
type Story = StoryObj<typeof CharacterHeroCard>;

export const Default: Story = {};

export const WithoutNamuwikiLink: Story = {
  args: {character: {...conan, namuwikiUrl: undefined}},
};
