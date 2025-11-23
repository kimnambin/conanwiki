import type {Meta, StoryObj} from '@storybook/react';
import App_navbar from './App_navbar';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';
import {MemoryRouter} from 'react-router-dom';

const meta: Meta<typeof App_navbar> = {
  title: 'App/App_navbar',
  component: App_navbar,
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

type Story = StoryObj<typeof App_navbar>;

export const Default: Story = {};
