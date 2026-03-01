import './ExamCountdown.css'

export default function ExamCountdown({ exams, onOpenModal, onDelete, currentView }) {
    const calculateDaysLeft = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const examDate = new Date(dateStr);
        const diffTime = examDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays < 0 ? 0 : diffDays;
    }

    return (
        <section className="glass-panel widget-panel exam-countdown">
            <header className="widget-header">
                <h2 className="widget-title">Exam Countdown</h2>
            </header>

            <div className="exams-list">
                {exams.length === 0 ? (
                    <div className="empty-state" style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textAlign: 'center' }}>No upcoming exams.</div>
                ) : (
                    exams.map(exam => {
                        const daysLeft = calculateDaysLeft(exam.date);
                        return (
                            <div key={exam.id} className="exam-card">
                                <div className="exam-info">
                                    <h3 className="exam-subject">{exam.subject}</h3>
                                    <p className="exam-date">{new Date(exam.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })}</p>
                                </div>
                                <div className="countdown-box">
                                    <span className="days-number">{daysLeft}</span>
                                    <span className="days-label">Days</span>
                                </div>
                                <button
                                    className="icon-btn delete-exam-btn"
                                    onClick={(e) => onDelete(e, exam.id)}
                                    title="Delete Exam"
                                >
                                    &times;
                                </button>
                            </div>
                        )
                    })
                )}
            </div>
            {currentView !== 'dashboard' && (
                <button className="add-exam-btn" onClick={onOpenModal}>
                    <span className="icon">+</span> Add Exam
                </button>
            )}
        </section>
    )
}
