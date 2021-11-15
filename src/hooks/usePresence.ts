import * as React from 'react'

type VisibilityStatus = 'Hidden' | 'Visible';
type AnimationStatus = 'AnimatingIn' | 'AnimatingOut';
export type PresenceStatus = VisibilityStatus | AnimationStatus

export interface Presence {
  hide: () => void,
  isVisible: boolean,
  show: () => void,
  status: PresenceStatus,
  toggle: () => void,
}

interface UsePresenceProps {
  duration: number;
  initialVisibility?: VisibilityStatus;
}

const usePresence = (props: UsePresenceProps) : Presence => {
  const { duration, initialVisibility } = props

  const [
    visibility,
    setVisibility
  ] = React.useState<VisibilityStatus>(initialVisibility || 'Hidden')

  const [
    status,
    setStatus
  ] = React.useState<PresenceStatus>(initialVisibility || 'Hidden')

  const [isFirstRender, setIsFirstRender] = React.useState(true)

  React.useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const timeoutId = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    if (isFirstRender) {
      return
    }

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    if (visibility === 'Visible') {
      setStatus('AnimatingIn')

      timeoutId.current = window.setTimeout(() => {
        setStatus(() => 'Visible')
      }, duration)
    } else {
      setStatus('AnimatingOut')

      timeoutId.current = window.setTimeout(() => {
        setStatus('Hidden')
      }, duration)
    }

    return () => clearTimeout(timeoutId.current)
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    duration,
    visibility
  ])

  return {
    hide: () => setVisibility('Hidden'),
    isVisible: visibility === 'Visible',
    show: () => setVisibility('Visible'),
    status,
    toggle: () => visibility === 'Visible'
      ? setVisibility('Hidden')
      : setVisibility('Visible')
  }
}

export default usePresence
