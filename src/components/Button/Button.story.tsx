import { ComponentMeta, ComponentStory } from '@storybook/react'
import * as React from 'react'

import Button from './Button'

export default {
  component: Button,
  title: 'Example/Button'
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args: any) => (
  <Button
    {...args}
  />
)

export const TextOnlyButton = Template.bind({})
TextOnlyButton.args = {
  children: 'Foo'
}
