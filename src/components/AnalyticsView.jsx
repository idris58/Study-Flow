import { useEffect, useState } from 'react';
import './AnalyticsView.css';

export default function AnalyticsView({ assignments, exams }) {
    const [pomodoroAnalytics, setPomodoroAnalytics] = useState({ date: new Date().toISOString().split('T')[0], focusMinutes: 0 });

    useEffect(() => {
        // Read directly from local storage for cross-component sync
        const stored = window.localStorage.getItem('pomodoro-analytics');
        if (stored) {
            setPomodoroAnalytics(JSON.parse(stored));
        }
    }, []);

    // Compute stats
    const totalAssignments = assignments.length;
    const completedAssignments = assignments.filter(a => a.status === 'completed').length;
    const pendingAssignments = totalAssignments - completedAssignments;

    const highPriorityPending = assignments.filter(a => a.priority === 'high' && a.status !== 'completed').length;

    const totalExams = exams.length;
    const totalSyllabusItems = exams.reduce((acc, exam) => acc + (exam.syllabus ? exam.syllabus.length : 0), 0);
    const completedSyllabusItems = exams.reduce((acc, exam) => acc + (exam.syllabus ? exam.syllabus.filter(i => i.completed).length : 0), 0);

    const syllabusProgress = totalSyllabusItems === 0 ? 0 : Math.round((completedSyllabusItems / totalSyllabusItems) * 100);
    const assignmentProgress = totalAssignments === 0 ? 0 : Math.round((completedAssignments / totalAssignments) * 100);

    return (
        <div className="analytics-container">
            <header className="analytics-header">
                <h2 className="heading-gradient">Performance Analytics</h2>
                <p className="subtitle">Overview of your study habits and progress.</p>
            </header>

            <div className="analytics-grid">

                {/* Study Time Widget */}
                <section className="glass-panel stat-card hero-stat">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-content">
                        <h3>Today's Focus Time</h3>
                        <div className="stat-value highlight">
                            {Math.floor(pomodoroAnalytics.focusMinutes / 60)}<span className="unit">h</span> {pomodoroAnalytics.focusMinutes % 60}<span className="unit">m</span>
                        </div>
                        <p className="stat-context">Keep the momentum going!</p>
                    </div>
                </section>

                {/* Assignments Widget */}
                <section className="glass-panel stat-card">
                    <div className="stat-icon">📚</div>
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

                {/* Priority Warnings Widget */}
                <section className="glass-panel stat-card warning-stat">
                    <div className="stat-icon pulse-icon">🔥</div>
                    <div className="stat-content">
                        <h3>Urgent Tasks</h3>
                        <div className="stat-value danger">
                            {highPriorityPending}
                        </div>
                        <p className="stat-context">High priority & pending</p>
                    </div>
                </section>

                {/* Syllabus Progress Widget */}
                <section className="glass-panel stat-card">
                    <div className="stat-icon">📅</div>
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
