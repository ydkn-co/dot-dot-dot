import { render, screen } from '@testing-library/react'

import { ReactComponent as Icon } from '~/assets/play.svg'

import ControlButton from './ControlButton'

describe('<ControlButton />', () => {
  test('icon is rendered', async () => {
    const labelText = 'Foo'

    render(
      <ControlButton
        Icon={Icon}
        text={labelText}
      />
    )

    const anscestor = screen.getByTestId('control-button')
    const descendant = screen.getByLabelText(labelText)

    expect(anscestor).toContainElement(descendant)
  })

  test('button is accessible for screen readers', async () => {
    const text = 'Foo'
    render(
      <ControlButton
        Icon={Icon}
        text={text}
      />
    )
    expect(
      screen.getByTestId('control-button')
    ).toHaveAttribute('aria-label', text)
  })

  test('styles are extensible', async () => {
    const className = 'foo'
    render(
      <ControlButton
        Icon={Icon}
        className={className}
        text="Foo"
      />
    )
    expect(screen.getByTestId('control-button')).toHaveClass(className)
  })
})
