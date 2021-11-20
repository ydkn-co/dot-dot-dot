import * as React from 'react'

type Callback = () => unknown

type Args = {
  callback: () => unknown
  delay: number,
}

interface Return {
  start: () => void;
  stop: () => void
}

const useControlledInterval = (args: Args) : Return => {
  const { callback, delay } = args
  const intervalRef = React.useRef<number>()
  const savedCallbackRef = React.useRef<Callback>(callback)

  React.useEffect(() => {
    savedCallbackRef.current = callback
  }, [callback])

  const stop = React.useCallback(() => {
    clearInterval(intervalRef.current)
  }, [])

  const start = React.useCallback(() => {
    if (!savedCallbackRef.current) {
      return
    }

    intervalRef.current = setInterval(() => {
      if (!savedCallbackRef.current) {
        return
      }

      savedCallbackRef.current()
    }, delay)

    return () => stop()
  }, [
    delay,
    intervalRef,
    savedCallbackRef,
    stop
  ])

  return {
    start,
    stop
  }
}

export default useControlledInterval
