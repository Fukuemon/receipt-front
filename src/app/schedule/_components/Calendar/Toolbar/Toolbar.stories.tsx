import { Toolbar } from './ToolbarContainer'

import type { Meta, StoryObj } from '@storybook/react'

type T = typeof Toolbar

export default {
  component: Toolbar,
} satisfies Meta<T>

type Story = StoryObj<T>

export const Default: Story = {
  args: {},
}
