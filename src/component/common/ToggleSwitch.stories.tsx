import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, fn, userEvent, within} from 'storybook/test';
import ToggleSwitch from './ToggleSwitch';

const meta: Meta<typeof ToggleSwitch<'character' | 'couple'>> = {
  title: 'Common/ToggleSwitch',
  component: ToggleSwitch,
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch<'character' | 'couple'>>;

export const CharacterSelected: Story = {
  args: {
    value: 'character',
    options: [
      {value: 'character', label: '👤 캐릭터'},
      {value: 'couple', label: '🩷 커플'},
    ],
  },
};

export const ClickingOtherOptionFiresOnChange: Story = {
  args: {
    ...CharacterSelected.args,
  },
  play: async ({args, canvasElement}) => {
    const canvas = within(canvasElement);
    const activeBtn = canvas.getByText('👤 캐릭터');
    await expect(activeBtn).toHaveClass('is-active');

    await userEvent.click(canvas.getByText('🩷 커플'));

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenCalledWith('couple');
  },
};
