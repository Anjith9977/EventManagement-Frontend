import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Context from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId='456595523856-1t5uhu7991i1a0gfql72dhap05jsegr9.apps.googleusercontent.com'>
    <BrowserRouter>
         <Context>
          <App />
         </Context>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
