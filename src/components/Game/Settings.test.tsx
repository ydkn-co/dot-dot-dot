import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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
        ).toHaveAccessibleName('game.settings.closed')
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
        expect(settingsBtn).toHaveAccessibleName('game.settings.opened')
      }
    )

    test('clicking the settings button again closes the settings', () => {
      const settingsForm = screen.getByTestId('settings-form')
      expect(settingsForm).toHaveClass('Pane--animatingIn')
      fireEvent.click(settingsBtn)
      expect(settingsForm).toHaveClass('Pane--animatingOut')
    })

    xtest('pressing the escape button closes the settings', () => {
      const settingsForm = screen.getByTestId('settings-form')
      expect(settingsForm).toHaveClass('Pane--animatingIn')

      if (settingsForm.parentNode) {
        fireEvent.keyDown(
          screen.getByText('game.settings.heading'),
          {
            charCode: 27,
            code: 'Escape',
            key: 'Escape',
            keyCode: 27
          }
        )

        expect(settingsForm).toHaveClass('Pane--animatingOut')
      } else {
        fail('Parent node not found')
      }

      expect(settingsForm).toHaveClass('Pane--animatingOut')
    })
  })
})
