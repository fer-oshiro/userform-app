import 'normalize.css'
import './styles/global.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Routes } from './routes'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors position="bottom-right" />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>
)
