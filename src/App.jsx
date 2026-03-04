import { useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [theme, setTheme] = useLocalStorage('app-theme', 'light')

  useEffect(() => {
    const applyTheme = (currentTheme) => {
      let activeTheme = currentTheme;
      if (currentTheme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        activeTheme = isDark ? 'dark' : 'light';
      }
      document.body.className = activeTheme === 'light' ? 'theme-zen' : '';
    };

    applyTheme(theme);

    // Watch for system changes if mode is 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <div className="app-container">
      <Dashboard theme={theme} setTheme={setTheme} />
    </div>
  )
}

export default App
