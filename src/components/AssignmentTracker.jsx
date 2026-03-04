import './AssignmentTracker.css'

export default function AssignmentTracker({ assignments, onToggleStatus, onDelete }) {

    const getRawDaysLeft = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(dateStr);
        const diffTime = dueDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const formatDueDate = (dateStr) => {
        const diffDays = getRawDaysLeft(dateStr);

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
        if (diffDays < 7) return `In ${diffDays} days`;

        const dueDate = new Date(dateStr);
        return dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    const totalAssignments = assignments.length;
    const completedAssignments = assignments.filter((a) => a.status === 'completed').length;
    const progressPercentage = totalAssignments === 0 ? 0 : Math.round((completedAssignments / totalAssignments) * 100);

    return (
        <section className="glass-panel widget-panel assignment-tracker">
            <header className="widget-header">
                <h2 className="widget-title">Assignments</h2>
                <div className="progress-container">
                    <div className="progress-text">{progressPercentage}% Completed</div>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
            </header>

            <div className="assignments-list">
                {assignments.length === 0 ? (
                    <div className="empty-state">No assignments currently. You're all caught up!</div>
                ) : (
                    assignments.map((assignment) => {
                        const daysLeft = getRawDaysLeft(assignment.dueDate);
                        const isAutoHigh = daysLeft <= 2 && daysLeft >= 0 && assignment.status !== 'completed';
                        const displayPriority = isAutoHigh ? 'high' : assignment.priority;

                        return (
                            <div
                                key={assignment.id}
                                className={`assignment-card ${assignment.status} ${isAutoHigh ? 'auto-priority' : ''}`}
                            >
                                <button
                                    className={`custom-checkbox ${assignment.status === 'completed' ? 'checked' : ''}`}
                                    onClick={(e) => onToggleStatus(e, assignment.id)}
                                >
                                    {assignment.status === 'completed' && (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </button>
                                <div className="assignment-info">
                                    <h3 className="assignment-title">
                                        {assignment.title}
                                        {isAutoHigh && (
                                            <span className="auto-priority-indicator" title="Due soon!">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 2s6 4.2 6 10a6 6 0 0 1-12 0c0-5.8 6-10 6-10z"></path>
                                                    <path d="M12 10v4"></path>
                                                    <circle cx="12" cy="17" r="0.7" fill="currentColor" stroke="none"></circle>
                                                </svg>
                                            </span>
                                        )}
                                    </h3>
                                    <p className="assignment-subject">{assignment.subject}</p>
                                </div>
                                <div className="assignment-meta">
                                    <span className={`priority-badge ${displayPriority}`}>{displayPriority}</span>
                                    <span className={`due-date ${isAutoHigh ? 'urgent-date' : ''}`}>{formatDueDate(assignment.dueDate)}</span>
                                </div>
                                <button
                                    className="delete-btn"
                                    onClick={(e) => onDelete(e, assignment.id)}
                                    title="Delete Task"
                                >
                                    &times;
                                </button>
                            </div>
                        )
                    })
                )}
            </div>
        </section>
    )
}
