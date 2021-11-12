import { useState } from 'react'

import styles from './App.module.scss'
import logo from './logo.svg'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div
      className={styles.App}
    >
      <header
        className={styles.AppHeader}
      >
        <img
          alt="logo"
          className={styles.AppLogo}
          src={logo}
        />
        <p>Hello Vite + React!</p>
        <p>
          <button
            data-testid="button"
            onClick={() => setCount((count) => count + 1)}
            type="button"
          >
            count is:
            {' '}
            {count}
          </button>
        </p>
        <p>
          Edit
          {' '}
          <code>App.tsx</code>
          {' '}
          and save to test HMR updates.
        </p>
        <p>
          <a
            className={styles.AppLink}
            href="https://reactjs.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            Learn React
          </a>
          {' | '}
          <a
            className={styles.AppLink}
            href="https://vitejs.dev/guide/features.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
