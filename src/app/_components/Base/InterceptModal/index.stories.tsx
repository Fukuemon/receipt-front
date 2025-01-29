import { Button } from '@/app/_components/Button'
import type { Meta, StoryObj } from '@storybook/react'
import { InterceptModal } from './index'

const meta: Meta<typeof InterceptModal> = {
  title: 'Common/InterceptModal',
  component: InterceptModal,
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
    stickyFooter: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof InterceptModal>

export const Default: Story = {
  args: {
    title: 'Modal Title',
    children: <p>This is the modal content.</p>,
  },
}

export const WithStickyFooter: Story = {
  args: {
    title: 'Modal with Sticky Footer',
    children: <p>This modal has a sticky footer.</p>,
    stickyFooter: <Button>Submit</Button>,
  },
}

export const LongContent: Story = {
  args: {
    title: 'Modal with Long Content',
    children: (
      <>
        <p>This modal has long content to demonstrate scrolling.</p>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <p key={i}>This is paragraph {i + 1}.</p>
          ))}
      </>
    ),
    stickyFooter: <Button>Submit</Button>,
  },
}
