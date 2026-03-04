import { useState } from 'react';
import { getLocalDateString } from '../utils/dateUtils';
import './AnalyticsView.css';

function StatIcon({ children, className = '' }) {
    return <div className={`stat-icon ${className}`}>{children}</div>;
}

export default function AnalyticsView({ assignments, exams }) {
    const [pomodoroAnalytics] = useState(() => {
        const today = getLocalDateString();
        const stored = window.localStorage.getItem('pomodoro-analytics');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.date === today) return parsed;
        }
        return { date: today, focusMinutes: 0 };
    });

    const totalAssignments = assignments.length;
    const completedAssignments = assignments.filter((a) => a.status === 'completed').length;
    const pendingAssignments = totalAssignments - completedAssignments;

    const highPriorityPending = assignments.filter((a) => a.priority === 'high' && a.status !== 'completed').length;

    const totalExams = exams.length;
    const totalSyllabusItems = exams.reduce((acc, exam) => acc + (exam.syllabus ? exam.syllabus.length : 0), 0);
    const completedSyllabusItems = exams.reduce((acc, exam) => acc + (exam.syllabus ? exam.syllabus.filter((i) => i.completed).length : 0), 0);

    const syllabusProgress = totalSyllabusItems === 0 ? 0 : Math.round((completedSyllabusItems / totalSyllabusItems) * 100);
    const assignmentProgress = totalAssignments === 0 ? 0 : Math.round((completedAssignments / totalAssignments) * 100);

    return (
        <div className="analytics-container">
            <header className="analytics-header">
                <h2 className="heading-gradient">Performance Analytics</h2>
                <p className="subtitle">Overview of your study habits and progress.</p>
            </header>

            <div className="analytics-grid">
                <section className="glass-panel stat-card hero-stat">
                    <StatIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="13" r="8"></circle>
                            <path d="M12 13V9"></path>
                            <path d="M12 13l3 2"></path>
                            <path d="M9 2h6"></path>
                        </svg>
                    </StatIcon>
                    <div className="stat-content">
                        <h3>Today's Focus Time</h3>
                        <div className="stat-value highlight">
                            {Math.floor(pomodoroAnalytics.focusMinutes / 60)}<span className="unit">h</span> {pomodoroAnalytics.focusMinutes % 60}<span className="unit">m</span>
                        </div>
                        <p className="stat-context">Keep the momentum going!</p>
                    </div>
                </section>

                <section className="glass-panel stat-card">
                    <StatIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                    </StatIcon>
                    <div className="stat-content">
                        <h3>Assignments</h3>
                        <div className="stat-row">
                            <div className="stat-item">
                                <span className="stat-label">Pending</span>
                                <span className="stat-number">{pendingAssignments}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Completed</span>
                                <span className="stat-number">{completedAssignments}</span>
                            </div>
                        </div>
                        <div className="progress-bar-bg mt-mini">
                            <div className="progress-bar-fill" style={{ width: `${assignmentProgress}%` }}></div>
                        </div>
                        <p className="stat-context text-right">{assignmentProgress}% overall</p>
                    </div>
                </section>

                <section className="glass-panel stat-card warning-stat">
                    <StatIcon className="pulse-icon warning-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2s6 4.2 6 10a6 6 0 0 1-12 0c0-5.8 6-10 6-10z"></path>
                            <path d="M12 11v3"></path>
                            <circle cx="12" cy="16.5" r="0.7" fill="currentColor" stroke="none"></circle>
                        </svg>
                    </StatIcon>
                    <div className="stat-content">
                        <h3>Urgent Tasks</h3>
                        <div className="stat-value danger">
                            {highPriorityPending}
                        </div>
                        <p className="stat-context">High priority and pending</p>
                    </div>
                </section>

                <section className="glass-panel stat-card">
                    <StatIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </StatIcon>
                    <div className="stat-content">
                        <h3>Exam Revision Progress</h3>
                        <div className="stat-row">
                            <div className="stat-item">
                                <span className="stat-label">Exams Tracked</span>
                                <span className="stat-number">{totalExams}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Topics Left</span>
                                <span className="stat-number">{totalSyllabusItems - completedSyllabusItems}</span>
                            </div>
                        </div>
                        <div className="progress-bar-bg mt-mini">
                            <div className="progress-bar-fill" style={{ width: `${syllabusProgress}%` }}></div>
                        </div>
                        <p className="stat-context text-right">{syllabusProgress}% syllabus coverage</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
