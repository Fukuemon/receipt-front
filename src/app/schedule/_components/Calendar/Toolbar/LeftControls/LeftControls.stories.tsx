import { LeftControls } from './LeftControls'

import type { Meta, StoryObj } from '@storybook/react'

type T = typeof LeftControls

export default {
  component: LeftControls,
} satisfies Meta<T>

type Story = StoryObj<T>

export const Default: Story = {
  args: {},
}
