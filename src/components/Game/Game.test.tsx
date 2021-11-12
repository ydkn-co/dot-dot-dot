import { fireEvent, screen, waitFor } from '@testing-library/react'

import { Translation } from '../../../translations'
import { resources } from '../../utils/i18n'
import { render } from '../../utils/testing'
import Game from '.'

describe('<Game />', () => {
  let t: Translation

  beforeEach(() => {
    t = resources.en.translation
    render(
      <Game />
    )
  })

  describe('before starting a game', () => {
    test('displays new game description', async () => {
      expect(screen.getByTestId('status-description')).toHaveTextContent(
        t.game.statusDescription.new
      )
    })
  })

  describe('after starting a game', () => {
    beforeEach(async () => {
      const playBtn = screen.getByTestId('play-btn')
      fireEvent.click(playBtn)
      await waitFor(() => playBtn)
    })

    test('displays playing game description', () => {
      expect(screen.getByTestId('status-description')).toHaveTextContent(
        t.game.statusDescription.playing
      )
    })

    test('hides play button', () => {
      expect(screen.queryByTestId('play-btn')).toBeNull()
    })

    test('shows the pause button', () => {
      expect(screen.queryByTestId('pause-btn')).not.toBeNull()
    })
  })

  describe('after pausing a game', () => {
    beforeEach(async () => {
      const playBtn = screen.getByTestId('play-btn')
      fireEvent.click(playBtn)
      await waitFor(() => playBtn)

      const pauseBtn = screen.getByTestId('pause-btn')
      fireEvent.click(pauseBtn)
      await waitFor(() => pauseBtn)
    })

    test('displays paused game description', () => {
      expect(screen.getByTestId('status-description')).toHaveTextContent(
        t.game.statusDescription.paused
      )
    })

    test('hides pause button', () => {
      expect(screen.queryByTestId('pause-btn')).toBeNull()
    })

    test('shows the play button', () => {
      expect(screen.queryByTestId('play-btn')).not.toBeNull()
    })
  })
})
