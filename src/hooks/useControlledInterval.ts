import * as React from 'react'

type Callback = () => unknown

const useControlledInterval = ({
  callback,
  delay
} : {
  callback: () => unknown
  delay: number,
}) => {
  const intervalRef = React.useRef<number>()
  const savedCallbackRef = React.useRef<Callback>()

  React.useEffect(() => {
    savedCallbackRef.current = callback
  }, [
    callback
  ])

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
