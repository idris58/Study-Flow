import { useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [theme, setTheme] = useLocalStorage('app-theme', 'dark')

  useEffect(() => {
    document.body.className = theme === 'light' ? 'theme-zen' : '';
  }, [theme]);

  return (
    <div className="app-container">
      <Dashboard theme={theme} setTheme={setTheme} />
    </div>
  )
}

export default App
