import { Meta, Story } from '@storybook/react'

import styled from '~/styled'

import BackgroundGrain, { BackgroundGrainProps } from './BackgroundGrain'

interface ContainerProps {
  backgroundColor: string;
  height: number;
  width: number;
}

const Container = styled.div<ContainerProps>`
  background-color: ${props => props.backgroundColor};
  height: ${props => props.height}px;
  position: relative;
  width: ${props => props.height}px;
`

export default {
  component: BackgroundGrain,
  title: 'Components/Background'
} as Meta<BackgroundGrainProps>

const Template: Story<BackgroundGrainProps & ContainerProps> = (args) => {
  const { backgroundColor, height, width, ...rest } = args
  return (
    <Container
      backgroundColor={backgroundColor}
      height={height}
      width={width}
    >
      <BackgroundGrain
        {...rest}
      />
    </Container>
  )
}

export const Default = Template.bind({})
Default.argTypes = {
  backgroundColor: {
    control: { type: 'color' }
  },
  height: {
    control: { max: 1200, min: 400, step: 50, type: 'range' }
  },
  width: {
    control: { max: 1200, min: 400, step: 50, type: 'range' }
  }
}
