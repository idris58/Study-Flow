import { useState } from 'react'
import './ExamCountdown.css'

export default function ExamCountdown({ exams, onOpenModal, onDelete, onUpdate, currentView }) {
    const [expandedId, setExpandedId] = useState(null)
    const calculateDaysLeft = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const examDate = new Date(dateStr);
        const diffTime = examDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays < 0 ? 0 : diffDays;
    }

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const handleAddSyllabusItem = (e, exam) => {
        e.preventDefault()
        const input = e.target.elements.topic
        if (!input.value.trim()) return

        const newItem = { id: Date.now(), topic: input.value, completed: false }
        const syllabus = exam.syllabus || []
        onUpdate({ ...exam, syllabus: [...syllabus, newItem] })
        e.target.reset()
    }

    const toggleSyllabusItem = (e, exam, itemId) => {
        e.stopPropagation()
        const syllabus = (exam.syllabus || []).map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        )
        onUpdate({ ...exam, syllabus })
    }

    const deleteSyllabusItem = (e, exam, itemId) => {
        e.stopPropagation()
        const syllabus = (exam.syllabus || []).filter(item => item.id !== itemId)
        onUpdate({ ...exam, syllabus })
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
                        const syllabus = exam.syllabus || [];
                        const completedCount = syllabus.filter(i => i.completed).length;
                        const progress = syllabus.length === 0 ? 0 : Math.round((completedCount / syllabus.length) * 100);
                        const isExpanded = expandedId === exam.id;

                        return (
                            <div key={exam.id} className={`exam-card-container ${isExpanded ? 'expanded' : ''}`}>
                                <div className="exam-card" onClick={() => toggleExpand(exam.id)}>
                                    <div className="exam-info">
                                        <h3 className="exam-subject">
                                            {exam.subject}
                                            {syllabus.length > 0 && <span className="exam-progress-badge">{progress}% ready</span>}
                                        </h3>
                                        <p className="exam-date">{new Date(exam.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })}</p>
                                    </div>
                                    <div className="countdown-box">
                                        <span className="days-number">{daysLeft}</span>
                                        <span className="days-label">Days</span>
                                    </div>
                                    <button
                                        className="delete-exam-btn"
                                        onClick={(e) => { e.stopPropagation(); onDelete(e, exam.id); }}
                                        title="Delete Exam"
                                    >
                                        &times;
                                    </button>
                                    <div className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="syllabus-container">
                                        <div className="syllabus-header">
                                            <h4>Syllabus / Revision Tracker</h4>
                                        </div>
                                        <div className="syllabus-list">
                                            {syllabus.length === 0 ? (
                                                <p className="empty-syllabus">Add topics or chapters you need to revise.</p>
                                            ) : (
                                                syllabus.map(item => (
                                                    <div key={item.id} className={`syllabus-item ${item.completed ? 'completed' : ''}`}>
                                                        <button
                                                            className={`custom-checkbox small ${item.completed ? 'checked' : ''}`}
                                                            onClick={(e) => toggleSyllabusItem(e, exam, item.id)}
                                                        >
                                                            {item.completed && (
                                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            )}
                                                        </button>
                                                        <span className="syllabus-topic">{item.topic}</span>
                                                        <button
                                                            className="delete-syllabus-btn"
                                                            onClick={(e) => deleteSyllabusItem(e, exam, item.id)}
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        <form className="add-syllabus-form" onSubmit={(e) => handleAddSyllabusItem(e, exam)}>
                                            <input type="text" name="topic" placeholder="Add chapter or topic..." required />
                                            <button type="submit" className="add-topic-btn">+</button>
                                        </form>
                                    </div>
                                )}
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
