import { render, RenderOptions } from '@testing-library/react'

import { AllProviders } from '~/hocs/withAllProviders'

export const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
