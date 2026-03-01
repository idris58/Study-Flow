import './Sidebar.css'

export default function Sidebar() {
    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-logo">
                <h2 className="heading-gradient">Productivity Planner</h2>
            </div>
            <nav className="sidebar-nav">
                <button className="nav-item active">
                    <span className="icon">📊</span>
                    <span className="label">Dashboard</span>
                </button>
                <button className="nav-item">
                    <span className="icon">📚</span>
                    <span className="label">Assignments</span>
                </button>
                <button className="nav-item">
                    <span className="icon">⏱️</span>
                    <span className="label">Pomodoro</span>
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
