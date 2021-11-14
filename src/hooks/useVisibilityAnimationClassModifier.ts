import * as React from 'react'

interface HookProps {
  duration: number; // ms
  isVisible?: boolean;
}

const useVisibilityAnimationClassModifier = (props: HookProps) : {
  cssClassModifier: string,
  isVisible: boolean,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  toggleIsVisible: () => void
} => {
  const [isFirstRender, setIsFirstRender] = React.useState(true)
  const { duration, isVisible: isVisibleProp } = props
  const timeoutId = React.useRef<number | undefined>(undefined)

  const [
    cssClassModifier,
    setCssClassModifier
  ] = React.useState<string>(isVisibleProp ? '--visible' : '')

  const [
    isVisible,
    setIsVisible
  ] = React.useState(isVisibleProp || false)

  React.useEffect(() => {
    setIsFirstRender(false)
  }, [])

  React.useEffect(() => {
    if (isFirstRender) {
      return
    }

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    if (isVisible) {
      setCssClassModifier('--animatingIn')

      timeoutId.current = window.setTimeout(() => {
        setCssClassModifier(() => '--visible')
      }, duration)
    } else {
      setCssClassModifier('--animatingOut')

      timeoutId.current = window.setTimeout(() => {
        setCssClassModifier(() => '')
      }, duration)
    }

    return () => clearTimeout(timeoutId.current)
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    duration,
    isVisible
  ])

  const toggleIsVisible = () => setIsVisible(!isVisible)

  return {
    cssClassModifier,
    isVisible,
    setIsVisible,
    toggleIsVisible
  }
}

export default useVisibilityAnimationClassModifier
