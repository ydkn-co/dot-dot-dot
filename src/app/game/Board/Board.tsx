import * as React from 'react'

import { useSettings } from '~/app/settings/store'

import { useGame } from '../store'
import { Wrapper } from './elements'

const Board: React.FC = () => {
  const { settings } = useSettings()
  const { game, dispatch } = useGame()

  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <th>Difficulty</th>
            <td>{settings.difficulty}</td>
          </tr>
          <tr>
            <th>Fall Rate</th>
            <td>
              {settings.difficulty * 10}
              {''}
              px / sec
            </td>
          </tr>
          <tr>
            <th>Score</th>
            <td>
              {game.score}
              <button
                onClick={() => {
                  dispatch({
                    payload: game.score + 10,
                    type: '@GAME/UPDATE_SCORE'
                  })
                }}
              >
                Increase by 10
              </button>
            </td>
          </tr>
          <tr>
            <th>Game Status</th>
            <td>
              {game.status}
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
}

export default Board
