// https://testing-library.com/docs/react-testing-library/setup#custom-render

import { render as rtlRender, RenderOptions } from '@testing-library/react'
import * as React from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from './i18n'

const AllTheProviders: React.FC = ({ children }) => (
  <I18nextProvider
    i18n={i18n}
  >
    {children}
  </I18nextProvider>
)

export const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: AllTheProviders, ...options })
