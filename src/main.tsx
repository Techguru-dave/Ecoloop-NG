import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './index.css'
import App from './App.tsx'

console.log('main.tsx loading...')

const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (!rootElement) {
  console.error('Root element not found!')
  throw new Error('Could not find root element')
}

try {
  const root = createRoot(rootElement)
  console.log('Root created')
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  console.log('App rendered')
} catch (error) {
  console.error('Error during React initialization:', error)
  rootElement.innerHTML = `<pre style="color: red; padding: 20px;">Error: ${String(error)}</pre>`
}
