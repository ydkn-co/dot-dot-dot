import * as React from 'react'

import styles from './App.module.scss'
import Game from './components/Game'

const App: React.FC = () => {
  return (
    <div
      className={styles.App}
    >
      <Game />
    </div>
  )
}

export default App
