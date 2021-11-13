import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import Settings from './Settings'

describe('<Settings />', () => {
  describe('when visible', () => {
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

  describe('when not visible visible', () => {
    test(
      // eslint-disable-next-line max-len
      'settings button text indicates that clicking the button opens the settings',
      async () => {
        render(
          <Settings />
        )

        const settingsBtn = screen.getByTestId('settings-btn')
        fireEvent.click(settingsBtn)
        await waitFor(() => settingsBtn)

        expect(settingsBtn).toHaveAccessibleName('game.settings.opened')
      }
    )
  })
})
