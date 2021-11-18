import {
  customRender as render,
  fireEvent,
  screen,
  waitFor
} from '~/testing-library'

import Settings from './Settings'

describe('<Settings />', () => {
  describe('when not visible', () => {
    test(
      // eslint-disable-next-line max-len
      'settings button text indicates that clicking the button closes the settings',
      () => {
        render(
          <Settings />
        )

        expect(
          screen.getByTestId('settings-btn')
        ).toHaveAccessibleName('settings.closed')
      }
    )
  })

  describe('when visible', () => {
    let settingsBtn: HTMLElement

    beforeEach(async () => {
      render(
        <Settings />
      )

      settingsBtn = screen.getByTestId('settings-btn')
      fireEvent.click(settingsBtn)
      await waitFor(() => settingsBtn)
    })

    test(
      // eslint-disable-next-line max-len
      'settings button text indicates that clicking the button opens the settings',
      () => {
        expect(settingsBtn).toHaveAccessibleName('settings.opened')
      }
    )

    test('clicking the settings button again closes the settings', () => {
      const settingsForm = screen.getByTestId('settings-form')
      expect(settingsForm).toHaveAttribute('data-modifier', '--animatingIn')
      fireEvent.click(settingsBtn)
      expect(settingsForm).toHaveAttribute('data-modifier', '--animatingOut')
    })

    xtest('pressing the escape button closes the settings', () => {
      const settingsForm = screen.getByTestId('settings-form')
      expect(settingsForm).toHaveAttribute('data-modifier', '--animatingIn')

      if (settingsForm.parentNode) {
        fireEvent.keyDown(
          screen.getByText('settings.heading'),
          {
            charCode: 27,
            code: 'Escape',
            key: 'Escape',
            keyCode: 27
          }
        )

        expect(settingsForm).toHaveAttribute('data-modifier', '--animatingOut')
      } else {
        fail('Parent node not found')
      }

      expect(settingsForm).toHaveAttribute('data-modifier', '--animatingOut')
    })
  })
})
