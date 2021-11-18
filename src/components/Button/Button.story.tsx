import { Meta, Story } from '@storybook/react'

import { ReactComponent as PlayIcon } from '~/assets/play.svg'

import Button, { ButtonProps } from './Button'

export default {
  component: Button,
  title: 'Components/Button'
} as Meta<ButtonProps>

const Template: Story<ButtonProps> = (args) => (
  <Button
    {...args}
  />
)

export const TextOnlyButton = Template.bind({})
TextOnlyButton.args = {
  children: 'Submit'
}

export const IconOnlyButton = Template.bind({})
IconOnlyButton.args = {
  Icon: PlayIcon,
  'aria-label': 'Play'
}

export const TextAndIconButton = Template.bind({})
TextAndIconButton.args = {
  Icon: PlayIcon,
  children: 'Play'
}
