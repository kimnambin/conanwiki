import type {Meta, StoryObj} from '@storybook/react';
import App_search from './App_search';
import {MemoryRouter} from 'react-router-dom';

const meta: Meta<typeof App_search> = {
  title: 'App/App_search',
  component: App_search,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof App_search>;

export const Default: Story = {};

export const WithKeyword: Story = {
  args: {
    keyword: '코난',
  },
};
