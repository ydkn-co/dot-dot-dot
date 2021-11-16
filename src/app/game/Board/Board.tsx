import * as React from 'react'

import { useSettings } from '~/app/settings/store'

import { Wrapper } from './elements'

const Board: React.FC = () => {
  const { settings } = useSettings()

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
        </tbody>
      </table>
    </Wrapper>
  )
}

export default Board
