import * as React from 'react'

const initialState = {
  difficulty: 4
}
type State = typeof initialState;

type Action = {
  payload: State,
  type: '@SETTINGS/UPDATE'
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case '@SETTINGS/UPDATE':
      return action.payload
    default:
      return state
  }
}

export const SettingsContext = React.createContext<{
  dispatch: React.Dispatch<Action>,
  settings: State
}>({
  dispatch: () => null,
  settings: initialState
})

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, dispatch] = React.useReducer(reducer, initialState)

  return (
    <SettingsContext.Provider
      value={{ dispatch, settings }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => React.useContext(SettingsContext)
