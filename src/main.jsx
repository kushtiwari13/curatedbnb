import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { applyTheme } from './theme/applyTheme'
import AppRoutes from './routes/AppRoutes'
import './styles/global.css'

applyTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  </StrictMode>,
)
