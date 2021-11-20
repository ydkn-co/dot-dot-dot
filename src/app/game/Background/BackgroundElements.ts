import * as React from 'react'

import BaseLotus from '~/app/game/Lotus'
import styled from '~/styled'

export const LotusWrapper = styled.div`
  height: 100%;
  width: 100%;
  z-index: ${props => props.theme.zIndex.background.lotus};
`
LotusWrapper.displayName = 'Background.LotusWrapper'

export const LeftLotus = React.memo(styled(BaseLotus)`
  left: 0;
  position: absolute;
  width: 500px;
`)
LeftLotus.displayName = 'Background.LeftLotus'

export const RightLotus = React.memo(styled(BaseLotus)`
  position: absolute;
  right: 0;
`)
RightLotus.displayName = 'Background.RightLotus'
