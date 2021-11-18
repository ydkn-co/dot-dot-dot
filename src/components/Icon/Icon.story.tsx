import { Meta, Story } from '@storybook/react'

import { ReactComponent as PlayIcon } from '~/assets/play.svg'

import Icon, { IconProps } from './Icon'

export default {
  component: Icon,
  title: 'Components/Icon'
} as Meta<IconProps>

const Template: Story<IconProps> = (args) => (
  <Icon
    {...args}
  />
)

export const Small = Template.bind({})
Small.args = {
  Svg: PlayIcon,
  size: 'sm'
}

export const Medium = Template.bind({})
Medium.args = {
  Svg: PlayIcon,
  size: 'md'
}

export const Large = Template.bind({})
Large.args = {
  Svg: PlayIcon,
  size: 'lg'
}

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  Svg: PlayIcon,
  size: 'xl'
}
