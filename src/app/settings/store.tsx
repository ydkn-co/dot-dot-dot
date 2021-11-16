import * as React from 'react'
interface State {
  difficulty: number
}

const initialState: State = {
  difficulty: 4
}

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

  const value = React.useMemo(() => ({ dispatch, settings }), [settings])

  return (
    <SettingsContext.Provider
      value={value}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = React.useContext(SettingsContext)

  if (!context) {
    throw new Error(
      '`useSettings()` must be used within `<SettingsProvider />`'
    )
  }

  return context
}