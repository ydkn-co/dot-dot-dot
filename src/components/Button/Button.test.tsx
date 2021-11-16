import { render, screen } from '@testing-library/react'

import { ReactComponent as Icon } from '~/assets/play.svg'

import Button from './Button'

describe('<ControlButton />', () => {
  test('icon is rendered', async () => {
    const labelText = 'Foo'

    render(
      <Button
        Icon={Icon}
      >
        {labelText}
      </Button>
    )

    const anscestor = screen.getByRole('button')
    const descendant = screen.getByLabelText(labelText)

    expect(anscestor).toContainElement(descendant)
  })

  test('button is accessible for screen readers', async () => {
    const text = 'Foo'
    render(
      <Button
        Icon={Icon}
      >
        {text}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', text)
  })

  test('styles are extensible', async () => {
    const className = 'foo'
    render(
      <Button
        Icon={Icon}
        className={className}
      >
        Foo
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(className)
  })
})
