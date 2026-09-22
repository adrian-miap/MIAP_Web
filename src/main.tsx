import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CookieConsent from './CookieConsent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <CookieConsent />
  </StrictMode>,
)
