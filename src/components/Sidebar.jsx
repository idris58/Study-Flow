import './Sidebar.css'

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
                    <span className="icon">📊</span>
                    <span className="label">Dashboard</span>
                </button>
                <button
                    className={`nav-item ${currentView === 'assignments' ? 'active' : ''}`}
                    onClick={() => setCurrentView('assignments')}
                >
                    <span className="icon">📚</span>
                    <span className="label">Assignments</span>
                </button>
                <button
                    className={`nav-item ${currentView === 'exams' ? 'active' : ''}`}
                    onClick={() => setCurrentView('exams')}
                >
                    <span className="icon">📅</span>
                    <span className="label">Exams</span>
                </button>
                <button
                    className={`nav-item ${currentView === 'pomodoro' ? 'active' : ''}`}
                    onClick={() => setCurrentView('pomodoro')}
                >
                    <span className="icon">⏱️</span>
                    <span className="label">Pomodoro</span>
                </button>
                <button
                    className={`nav-item ${currentView === 'analytics' ? 'active' : ''}`}
                    onClick={() => setCurrentView('analytics')}
                >
                    <span className="icon">📈</span>
                    <span className="label">Analytics</span>
                </button>
            </nav>
            <div className="sidebar-footer">
                <button className="nav-item">
                    <span className="icon">⚙️</span>
                    <span className="label">Settings</span>
                </button>
            </div>
        </aside>
    )
}
