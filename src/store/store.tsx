import * as React from 'react'

export type Status = 'unstarted' | 'playing' | 'paused' | 'over'

export interface Dimensions {
  height: number;
  width: number;
}

export interface State {
  backgroundColor: string;
  dimensions: Dimensions;
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
  status: Status;
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
  | { type: '@APP/UPDATE_BACKGROUND_COLOR', payload: string }
  | { type: '@APP/UPDATE_DIFFICULTY', payload: number }
  | { type: '@APP/UPDATE_DIMENSIONS', payload: Dimensions }
  | { type: '@APP/UPDATE_SCORE', payload: number }
  | { type: '@APP/UPDATE_STATUS', payload: Status }
/* eslint-enable typescript-sort-keys/interface */

const reducer = (state: State = initialState, action: Action) => {
  console.log(action)
  switch (action.type) {
    case '@APP/UPDATE_BACKGROUND_COLOR':
      return {
        ...state,
        backgroundColor: action.payload
      }
    case '@APP/UPDATE_DIFFICULTY':
      return {
        ...state,
        settings: {
          ...state.settings,
          difficulty: action.payload
        }
      }
    case '@APP/UPDATE_DIMENSIONS':
      return {
        ...state,
        dimensions: action.payload
      }
    case '@APP/UPDATE_SCORE':
      return {
        ...state,
        score: action.payload
      }
    case '@APP/UPDATE_STATUS':
      return {
        ...state,
        status: action.payload
      }
    default:
      return state
  }
}

export const AppStateContext = React.createContext<{
  app: State,
  dispatch: React.Dispatch<Action>
}>({
  app: initialState,
  dispatch: () => null
})

export const AppStateProvider: React.FC = ({ children }) => {
  const [app, dispatch] = React.useReducer(reducer, initialState)

  const value = React.useMemo(() => ({ app, dispatch }), [app])

  return (
    <AppStateContext.Provider
      value={value}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const context = React.useContext(AppStateContext)

  if (!context) {
    throw new Error(
      '`useAppState()` must be used within `<AppStateProvider />`'
    )
  }

  return context
}
