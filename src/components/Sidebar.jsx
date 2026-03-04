import './Sidebar.css'

function NavIcon({ children }) {
    return <span className="nav-icon" aria-hidden="true">{children}</span>
}

export default function Sidebar({ currentView, setCurrentView }) {
    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-logo">
                <h2 className="heading-gradient">Study Flow</h2>
            </div>
            <nav className="sidebar-nav">
                <button
                    className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setCurrentView('dashboard')}
                >
                    <NavIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3v18h18"></path>
                            <path d="M7 14l3-3 3 2 4-5"></path>
                        </svg>
                    </NavIcon>
                    <span className="label">Dashboard</span>
                </button>
                <button
                    className={`nav-item ${currentView === 'assignments' ? 'active' : ''}`}
                    onClick={() => setCurrentView('assignments')}
                >
                    <NavIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                    </NavIcon>
                    <span className="label">Assignments</span>
                </button>
                <button
                    className={`nav-item ${currentView === 'exams' ? 'active' : ''}`}
                    onClick={() => setCurrentView('exams')}
                >
                    <NavIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </NavIcon>
                    <span className="label">Exams</span>
                </button>
                <button
                    className={`nav-item ${currentView === 'pomodoro' ? 'active' : ''}`}
                    onClick={() => setCurrentView('pomodoro')}
                >
                    <NavIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="13" r="8"></circle>
                            <path d="M12 13V9"></path>
                            <path d="M12 13l3 2"></path>
                            <path d="M9 2h6"></path>
                        </svg>
                    </NavIcon>
                    <span className="label">Pomodoro</span>
                </button>
                <button
                    className={`nav-item ${currentView === 'analytics' ? 'active' : ''}`}
                    onClick={() => setCurrentView('analytics')}
                >
                    <NavIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3v18h18"></path>
                            <rect x="7" y="11" width="3" height="7"></rect>
                            <rect x="12" y="8" width="3" height="10"></rect>
                            <rect x="17" y="5" width="3" height="13"></rect>
                        </svg>
                    </NavIcon>
                    <span className="label">Analytics</span>
                </button>
            </nav>
            <div className="sidebar-footer">
                <button
                    className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
                    onClick={() => setCurrentView('settings')}
                >
                    <NavIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </svg>
                    </NavIcon>
                    <span className="label">Settings</span>
                </button>
            </div>
        </aside>
    )
}
