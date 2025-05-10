import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import "./styles/base/colors.css"
import App from './App.jsx'
import { AuthProvider } from './features/user/context/authContext.jsx'
import ProjectRoutes from './Routes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
    <Navbar/>
      <ProjectRoutes />
    </Router>
  </AuthProvider>,
);