import {
  customRender as render,
  fireEvent,
  screen,
  waitFor
} from '~/utils/testing-library'

import Layout from './App'

describe('<Game />', () => {
  beforeEach(() => {
    render(
      <Layout />
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

  xdescribe('after starting a game', () => {
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

  xdescribe('after pausing a game', () => {
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
