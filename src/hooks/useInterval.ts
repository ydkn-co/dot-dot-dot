import * as React from 'react'

type Callback = () => unknown;

const useInterval = (callback: Callback, delay: number) => {
  const intervalRef = React.useRef<number>()
  const savedCallbackRef = React.useRef<Callback>(callback)

  React.useEffect(() => {
    savedCallbackRef.current = callback
  }, [
    callback
  ])

  const stop = () => {
    clearInterval(intervalRef.current)
  }

  const start = () => {
    intervalRef.current = setInterval(() => {
      savedCallbackRef.current()
    }, delay)

    return () => stop()
  }

  return {
    ref: intervalRef,
    start,
    stop
  }
}

export default useInterval
