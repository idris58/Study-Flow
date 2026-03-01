import './AssignmentTracker.css'

export default function AssignmentTracker({ assignments, onToggleStatus, onDelete }) {

    // Helper to format date relative to today
    const formatDueDate = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(dateStr);
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
        if (diffDays < 7) return `In ${diffDays} days`;

        return dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    return (
        <section className="glass-panel widget-panel assignment-tracker">
            <header className="widget-header">
                <h2 className="widget-title">Assignments</h2>
            </header>

            <div className="assignments-list">
                {assignments.length === 0 ? (
                    <div className="empty-state">No assignments currently. You're all caught up!</div>
                ) : (
                    assignments.map(assignment => (
                        <div
                            key={assignment.id}
                            className={`assignment-card ${assignment.status}`}
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
                                <h3 className="assignment-title">{assignment.title}</h3>
                                <p className="assignment-subject">{assignment.subject}</p>
                            </div>
                            <div className="assignment-meta">
                                <span className={`priority-badge ${assignment.priority}`}>{assignment.priority}</span>
                                <span className="due-date">{formatDueDate(assignment.dueDate)}</span>
                                <button
                                    className="icon-btn delete-btn"
                                    onClick={(e) => onDelete(e, assignment.id)}
                                    title="Delete Task"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}
