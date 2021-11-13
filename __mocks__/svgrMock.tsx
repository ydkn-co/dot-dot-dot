import * as React from 'react'

export default 'SvgrURL'

const SvgrMock = React.forwardRef((props, ref) => {
  return (
    <span
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as unknown as any}
      {...props}
    />
  )
})

SvgrMock.displayName = 'SvgrMock'

export const ReactComponent = SvgrMock
