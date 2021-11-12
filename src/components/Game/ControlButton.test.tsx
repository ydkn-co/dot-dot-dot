import { render, screen } from '@testing-library/react'

import ControlButton from './ControlButton'

describe('<ControlButton />', () => {
  test('icon is rendered', async () => {
    const icon = (
      <span
        data-testid="svg"
      >
        Bar
      </span>
    )

    render(
      <ControlButton
        icon={icon}
        text='Foo'
      />
    )

    const anscestor = screen.getByTestId('control-button')
    const descendant = screen.getByTestId('svg')
    expect(anscestor).toContainElement(descendant)
  })

  test('text is rendered', async () => {
    const text = 'Foo'
    render(
      <ControlButton
        icon={<></>}
        text={text}
      />
    )
    expect(screen.getByTestId('control-button')).toHaveTextContent(text)
  })

  test('styles are extensible', async () => {
    const className = 'foo'
    render(
      <ControlButton
        className={className}
        icon={<></>}
        text="Foo"
      />
    )
    expect(screen.getByTestId('control-button')).toHaveClass(className)
  })
})
