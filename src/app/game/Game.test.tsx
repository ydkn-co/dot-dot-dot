import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import Game from '.'

describe('<Game />', () => {
  beforeEach(() => {
    render(
      <Game />
    )
  })

  describe('before starting a game', () => {
    test('hides pause button', () => {
      expect(screen.queryByTestId('pause-btn')).toBeNull()
    })

    test('shows the play button', () => {
      expect(screen.queryByTestId('play-btn')).not.toBeNull()
    })
  })

  describe('after starting a game', () => {
    beforeEach(async () => {
      const playBtn = screen.getByTestId('play-btn')
      fireEvent.click(playBtn)
      await waitFor(() => playBtn)
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

    test('hides pause button', () => {
      expect(screen.queryByTestId('pause-btn')).toBeNull()
    })

    test('shows the play button', () => {
      expect(screen.queryByTestId('play-btn')).not.toBeNull()
    })
  })
})
