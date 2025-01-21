import { Calendar } from './CalendarContainer'

import type { Meta, StoryObj } from '@storybook/react'

type T = typeof Calendar

export default {
  component: Calendar,
} satisfies Meta<T>

type Story = StoryObj<T>

export const Default: Story = {
  args: {},
}
