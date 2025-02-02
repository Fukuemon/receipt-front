import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from './index'

const meta: Meta = {
  title: 'Common/Button',
  component: Button,
}

export default meta
type Story = StoryObj

export const Primary: Story = {
  args: {
    children: 'button',
    variant: 'primary',
  },
}

export const PrimaryDisabled: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    disabled: true,
  },
}

export const Secondary: Story = {
  args: {
    children: 'button',
    variant: 'secondary',
  },
}
export const Small: Story = {
  args: {
    children: 'button',
    size: 'S',
  },
}

export const Medium: Story = {
  args: {
    children: 'button',
    size: 'M',
  },
}

export const Large: Story = {
  args: {
    children: 'button',
    size: 'L',
  },
}

export const Wide: Story = {
  args: {
    children: 'button',
    isWide: true,
  },
}

export const Click: Story = {
  args: {
    children: 'button',
    onclick: fn(),
  },
}

export const Anchor: Story = {
  args: {
    children: 'button',
    isAnchor: true,
    href: '#',
  },
}
export const AnchorDisabled: Story = {
  args: {
    children: 'button',
    isAnchor: true,
    href: '#',
    disabled: true,
  },
}
