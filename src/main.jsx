import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyTheme } from './theme/applyTheme'
import AppRoutes from './routes/AppRoutes'
import './styles/global.css'

applyTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
