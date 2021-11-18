import Icon from '~/components/Icon'
import { customRender as render, screen } from '~/testing-library'
import theme from '~/theme'

import Button from './Button'

const PlaySvg = theme.icons.svgs.PlaySvg

const iconFixture = (
  <Icon
    Svg={PlaySvg}
    size="md"
  />
)

describe('<ControlButton />', () => {
  test('icon is rendered', async () => {
    const labelText = 'Foo'

    render(
      <Button
        aria-label={labelText}
        icon={iconFixture}
      />
    )

    const anscestor = screen.getByRole('button')
    const descendant = screen.getByLabelText(labelText)

    expect(anscestor).toContainElement(descendant)
  })

  test('button is accessible for screen readers', async () => {
    const text = 'Foo'
    render(
      <Button
        aria-label={text}
        icon={iconFixture}
      />
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', text)
  })

  test('styles are extensible', async () => {
    const className = 'foo'
    render(
      <Button
        className={className}
        icon={iconFixture}
      >
        Foo
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(className)
  })
})
