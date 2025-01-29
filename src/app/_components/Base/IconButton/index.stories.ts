import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { IconButton } from './index'

const meta: Meta = {
  title: 'Common/IconButton',
  component: IconButton,
}

export default meta
type Story = StoryObj

export const Primary: Story = {
  args: {
    children: '○￥',
    variant: 'primary',
  },
}

export const Click: Story = {
  args: {
    children: '○￥',
    onclick: fn(),
  },
}
