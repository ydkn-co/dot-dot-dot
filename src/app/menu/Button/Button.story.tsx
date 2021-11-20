import { Meta, Story } from '@storybook/react'

import { ReactComponent as PlaySvg } from '~/assets/play.svg'

import Icon from '../Icon'
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
  'aria-label': 'Play',
  icon: (
    <Icon
      Svg={PlaySvg}
      size="sm"
    />
  )
}

export const TextAndIconButton = Template.bind({})
TextAndIconButton.args = {
  children: 'Play',
  icon: (
    <Icon
      Svg={PlaySvg}
      size="sm"
    />
  )
}
