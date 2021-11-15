import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Wrapper } from './elements'

const Logo: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      {t('app.name')}
    </Wrapper>
  )
}

export default Logo
