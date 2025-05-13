import { AuthProvider } from './features/user/context/authContext.jsx'
import ProjectRoutes from './Routes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import './styles/App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ProjectRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
