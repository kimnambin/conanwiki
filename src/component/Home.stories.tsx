import type {Meta, StoryObj} from '@storybook/react';
import Home from './Home';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../redux/store';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {};
