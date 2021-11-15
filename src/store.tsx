import * as React from 'react'

const initialState = {
  score: 0,
  settings: {
    difficulty: 4
  }
}
type State = typeof initialState;

/* eslint-disable typescript-sort-keys/interface */
export type Action =
  | { type: 'UPDATE_SETTINGS', payload: Pick<State, 'settings'> }
  | { type: 'UPDATE_SCORE', payload: Pick<State, 'score'> }
/* eslint-enable typescript-sort-keys/interface */

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: action.payload.settings
      }
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: action.payload.score
      }
    default:
      return state
  }
}

export const AppContext = React.createContext<{
  dispatch: React.Dispatch<Action>,
  state: State
}>({
  dispatch: () => null,
  state: initialState
})

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <AppContext.Provider
      value={{ dispatch, state }}
    >
      {children}
    </AppContext.Provider>
  )
}
