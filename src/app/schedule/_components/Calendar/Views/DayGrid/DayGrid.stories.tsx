import { DayGridPresenter } from './DayGridPresenter'

import type { Meta, StoryObj } from '@storybook/react'

type T = typeof DayGridPresenter

export default {
  component: DayGridPresenter,
} satisfies Meta<T>

type Story = StoryObj<T>

export const Default: Story = {
  args: {
    currentCalendarView: 'dayGridMonth',
  },
}
