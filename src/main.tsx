import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BlinkProvider } from '@blinkdotnew/react'
import App from './App.tsx'
import './index.css'

function getProjectId(): string {
  const envId = import.meta.env.VITE_BLINK_PROJECT_ID;
  if (envId) return envId;
  return 'demo-project';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BlinkProvider 
      projectId={getProjectId()}
      publishableKey={import.meta.env.VITE_BLINK_PUBLISHABLE_KEY}
    >
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BlinkProvider>
  </React.StrictMode>,
)
