import { Menubar } from '@/app/_components/Menubar'
import { Toggle, ToggleStateType } from '@/app/_components/Toggle/index'
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

const links = [
  { href: '/calendar', label: 'カレンダー' },
  { href: '/patient', label: '患者' },
  { href: '/staff', label: '職員情報' },
  { href: '/indicators', label: '経営数値' },
]

export const Calendar: Story = {
  args: {
    leftIcon: <HamburgerIcon />,
    left: <div>logo</div>,
    center: <div>Calender</div>,
    right: (
      <Toggle
        toggleState={ToggleStateType.DEFAULT}
        label="キャンセル予定表示"
      />
    ),
    rightIcon: <UserIcon />,
    menubar: <Menubar links={links} currentLink="/calendar" isOpen />,
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
