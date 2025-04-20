import { MemoryRouter } from 'react-router'
import { render, RenderOptions } from '@testing-library/react'

export function renderWithRouter(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: MemoryRouter, ...options })
}
