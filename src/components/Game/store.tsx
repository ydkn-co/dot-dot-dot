import merge from 'lodash.merge'
import * as React from 'react'

export type Status = 'unstarted' | 'playing' | 'paused' | 'over'

export interface Dimensions {
  height: number;
  width: number;
}

export interface Settings {
  canToggleFullscreen: boolean,
  diameter: {
    max: number;
    min: number;
  },
  difficulty: number;
  interval: number;
  isReadonly: boolean,
  value: {
    max: number;
    min: number;
  }
}

export interface State {
  backgroundColor: string;
  dimensions: Dimensions;
  isFullscreen: boolean;
  score: number;
  settings: Settings,
  status: Status;
}

export const initialState: State = {
  backgroundColor: '',
  dimensions: {
    height: 0,
    width: 0
  },
  isFullscreen: false,
  score: 0,
  settings: {
    canToggleFullscreen: false,
    diameter: {
      max: 100,
      min: 10
    },
    difficulty: 1,
    interval: 1000,
    isReadonly: false,
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
  | { type: '@GAME/UPDATE_DIMENSIONS', payload: Dimensions }
  | { type: '@GAME/UPDATE_IS_FULLSCREEN', payload: boolean }
  | { type: '@GAME/UPDATE_SCORE', payload: number }
  | { type: '@GAME/UPDATE_SETTINGS', payload: Partial<Settings> }
  | { type: '@GAME/UPDATE_SETTINGS_DIFFICULTY', payload: number }
  | { type: '@GAME/UPDATE_STATUS', payload: Status }
/* eslint-enable typescript-sort-keys/interface */

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case '@GAME/UPDATE_BACKGROUND_COLOR':
      return {
        ...state,
        backgroundColor: action.payload
      }
    case '@GAME/UPDATE_DIMENSIONS':
      return {
        ...state,
        dimensions: action.payload
      }
    case '@GAME/UPDATE_IS_FULLSCREEN':
      return {
        ...state,
        isFullscreen: action.payload
      }
    case '@GAME/UPDATE_SETTINGS':
      return merge(
        {},
        state,
        {
          settings: action.payload
        }
      )
    case '@GAME/UPDATE_SETTINGS_DIFFICULTY':
      return merge(
        {},
        state,
        {
          settings: {
            difficulty: action.payload
          }
        }
      )
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
