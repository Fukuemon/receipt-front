import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './index'
import HamburgerIcon from '/public/icons/hamburger.svg'
import UserIcon from '/public/icons/user.svg'

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
}

export default meta
type Story = StoryObj<typeof Header>

export const Calendar: Story = {
  args: {
    leftIcon: <HamburgerIcon />,
    left: <div>logo</div>,
    center: <div>Calender</div>,
    rightIcon: <UserIcon />,
  },
}
export const List: Story = {
  args: {
    leftIcon: <HamburgerIcon />,
    rightIcon: <div>user</div>,
    left: <div>logo</div>,
    center: <div>center</div>,
  },
}
