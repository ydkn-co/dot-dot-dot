import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import App from './App'

describe('<App />', () => {
  it('clicking the button increments the count', async () => {
    render(<App />)

    const button = screen.getByTestId('button')
    expect(button).toHaveTextContent('count is: 0')

    fireEvent.click(button)
    await waitFor(() => button)

    expect(button).toHaveTextContent('count is: 1')

    fireEvent.click(button)
    await waitFor(() => button)
    fireEvent.click(button)
    await waitFor(() => button)

    expect(button).toHaveTextContent('count is: 3')
  })
})
