import * as React from 'react'

type GameStatus = 'unstarted' | 'playing' | 'paused' | 'over'

interface State {
  score: number;
  status: GameStatus;
}

const initialState: State = {
  score: 0,
  status: 'unstarted'
}

/* eslint-disable typescript-sort-keys/interface */
type Action =
  | { type: '@GAME/UPDATE_SCORE', payload: number }
  | { type: '@GAME/UPDATE_STATUS', payload: GameStatus }
/* eslint-enable typescript-sort-keys/interface */

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case '@GAME/UPDATE_SCORE':
      return {
        ...state,
        score: action.payload
      }
    case '@GAME/UPDATE_STATUS':
      return {
        ...state,
        status: action.payload
      }
    default:
      return state
  }
}

export const GameContext = React.createContext<{
  dispatch: React.Dispatch<Action>,
  game: State
}>({
  dispatch: () => null,
  game: initialState
})

export const GameProvider: React.FC = ({ children }) => {
  const [game, dispatch] = React.useReducer(reducer, initialState)

  const value = React.useMemo(() => ({ dispatch, game }), [game])

  return (
    <GameContext.Provider
      value={value}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = React.useContext(GameContext)

  if (!context) {
    throw new Error(
      '`useGame()` must be used within `<GameProvider />`'
    )
  }

  return context
}