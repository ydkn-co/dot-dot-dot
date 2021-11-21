import * as React from 'react'

export type GameStatus = 'unstarted' | 'playing' | 'paused' | 'over'
export interface GameDimensions {
  height: number;
  width: number;
}

export interface State {
  backgroundColor: string;
  dimensions: GameDimensions;
  score: number;
  settings: {
    diameter: {
      max: number;
      min: number;
    },
    difficulty: number;
    interval: number;
    value: {
      max: number;
      min: number;
    }
  },
  status: GameStatus;
}

const initialState: State = {
  backgroundColor: '',
  dimensions: {
    height: 0,
    width: 0
  },
  score: 0,
  settings: {
    diameter: {
      max: 100,
      min: 10
    },
    difficulty: 5,
    interval: 1000,
    value: {
      max: 10,
      min: 1
    }
  },
  status: 'unstarted'
}

/* eslint-disable typescript-sort-keys/interface */
type Action =
  | { type: '@GAME/UPDATE_BACKGROUND_COLOR', payload: string }
  | { type: '@GAME/UPDATE_DIFFICULTY', payload: number }
  | { type: '@GAME/UPDATE_DIMENSIONS', payload: GameDimensions }
  | { type: '@GAME/UPDATE_SCORE', payload: number }
  | { type: '@GAME/UPDATE_STATUS', payload: GameStatus }
/* eslint-enable typescript-sort-keys/interface */

const reducer = (state: State = initialState, action: Action) => {
  console.log(action)
  switch (action.type) {
    case '@GAME/UPDATE_BACKGROUND_COLOR':
      return {
        ...state,
        backgroundColor: action.payload
      }
    case '@GAME/UPDATE_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload
      }
    case '@GAME/UPDATE_DIMENSIONS':
      return {
        ...state,
        dimensions: action.payload
      }
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
