import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Wrapper } from './LogoElements'

const Logo: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Wrapper
      aria-label={t`app.name`}
      role="presentation"
    >
      {t`app.name`}
    </Wrapper>
  )
}

export default React.memo(Logo)
