import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Bullet, Dot, Wrapper } from './LogoElements'

const Logo: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Wrapper
      aria-label={t`app.name`}
      role="presentation"
    >
      <Dot />
      <Bullet />
      <Dot />
      <Bullet />
      <Dot />
    </Wrapper>
  )
}

export default Logo
