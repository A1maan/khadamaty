/* this is the entry point that wires context providers around the app */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { MockDataProvider } from './context/MockDataContext.jsx'
import GlobalToast from './components/Toast/GlobalToast.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <MockDataProvider>
        <ErrorBoundary>
          <App />
          <GlobalToast />
        </ErrorBoundary>
      </MockDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
