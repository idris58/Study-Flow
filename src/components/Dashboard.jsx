import { useState } from 'react'
import Sidebar from './Sidebar'
import AssignmentTracker from './AssignmentTracker'
import ExamCountdown from './ExamCountdown'
import PomodoroTimer from './PomodoroTimer'
import AnalyticsView from './AnalyticsView'
import SettingsView from './SettingsView'
import Modal from './Modal'
import { useLocalStorage } from '../hooks/useLocalStorage'
import './Dashboard.css'

export default function Dashboard({ theme, setTheme }) {
    const defaultAssignments = []
    const defaultExams = []
    const defaultUserProfile = { name: 'User' }

    const [assignments, setAssignments] = useLocalStorage('assignments', [
        ...defaultAssignments
    ])

    const [exams, setExams] = useLocalStorage('exams', [
        ...defaultExams
    ])

    const [userProfile, setUserProfile] = useLocalStorage('user-profile', {
        ...defaultUserProfile
    })

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const [isExamModalOpen, setIsExamModalOpen] = useState(false)
    const [currentView, setCurrentView] = useState('dashboard')

    // --- Handlers ---
    const handleAddTask = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newTask = {
            id: Date.now(),
            title: formData.get('title'),
            subject: formData.get('subject'),
            dueDate: formData.get('dueDate'),
            priority: formData.get('priority'),
            status: 'pending' // Default new tasks to pending
        }
        setAssignments([...assignments, newTask])
        setIsTaskModalOpen(false)
    }

    const toggleTaskStatus = (e, id) => {
        e.stopPropagation() // Prevent row click from triggering twice if overlapping
        setAssignments(assignments.map(a => {
            if (a.id === id) {
                const nextStatus = a.status === 'pending' || a.status === 'in-progress' ? 'completed' : 'pending';
                return { ...a, status: nextStatus }
            }
            return a
        }))
    }

    const deleteTask = (e, id) => {
        e.stopPropagation()
        setAssignments(assignments.filter(a => a.id !== id))
    }

    const handleAddExam = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newExam = {
            id: Date.now(),
            subject: formData.get('subject'),
            date: formData.get('date'),
            syllabus: []
        }
        setExams([...exams, newExam].sort((a, b) => new Date(a.date) - new Date(b.date)))
        setIsExamModalOpen(false)
    }

    const deleteExam = (e, id) => {
        e.stopPropagation()
        setExams(exams.filter(e => e.id !== id))
    }

    const updateExam = (updatedExam) => {
        setExams(exams.map(e => e.id === updatedExam.id ? updatedExam : e))
    }

    const handleClearAllData = () => {
        const managedKeys = [
            'assignments',
            'exams',
            'user-profile',
            'pomodoro-settings',
            'pomodoro-analytics',
            'app-theme'
        ]

        managedKeys.forEach((key) => window.localStorage.removeItem(key))
        setAssignments(defaultAssignments)
        setExams(defaultExams)
        setUserProfile(defaultUserProfile)
        setTheme('light')
        setCurrentView('dashboard')
    }

    return (
        <>
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
            <main className="dashboard-content">

                {currentView === 'dashboard' && (
                    <>
                        <header className="dashboard-header">
                            <div>
                                <h1 className="heading-gradient">Welcome back, {userProfile.name}!</h1>
                                <p className="subtitle">Plan smart. Focus better. Achieve more.</p>
                            </div>
                        </header>
                        <div className="dashboard-grid">
                            <div className="main-column">
                                <AssignmentTracker
                                    assignments={assignments}
                                    onToggleStatus={toggleTaskStatus}
                                    onDelete={deleteTask}
                                />
                            </div>
                            <div className="side-column">
                                <ExamCountdown
                                    exams={exams}
                                    onOpenModal={() => setIsExamModalOpen(true)}
                                    onDelete={deleteExam}
                                    onUpdate={updateExam}
                                    currentView={currentView}
                                />
                                <PomodoroTimer />
                            </div>
                        </div>
                    </>
                )}

                {currentView === 'assignments' && (
                    <>
                        <header className="dashboard-header">
                            <div>
                                <h1 className="heading-gradient">Assignments</h1>
                                <p className="subtitle">Track and manage your tasks.</p>
                            </div>
                            <div className="header-actions">
                                <button className="primary-btn glass-panel" onClick={() => setIsTaskModalOpen(true)}>
                                    + New Task
                                </button>
                            </div>
                        </header>
                        <div className="full-width-column">
                            <AssignmentTracker
                                assignments={assignments}
                                onToggleStatus={toggleTaskStatus}
                                onDelete={deleteTask}
                            />
                        </div>
                    </>
                )}

                {currentView === 'exams' && (
                    <>
                        <header className="dashboard-header">
                            <div>
                                <h1 className="heading-gradient">Exams</h1>
                                <p className="subtitle">Countdown to your upcoming exams.</p>
                            </div>
                            <div className="header-actions">
                                <button className="primary-btn glass-panel" onClick={() => setIsExamModalOpen(true)}>
                                    + Add Exam
                                </button>
                            </div>
                        </header>
                        <div className="full-width-column">
                            <ExamCountdown
                                exams={exams}
                                onOpenModal={() => setIsExamModalOpen(true)}
                                onDelete={deleteExam}
                                onUpdate={updateExam}
                                currentView={currentView}
                            />
                        </div>
                    </>
                )}

                {currentView === 'pomodoro' && (
                    <>
                        <header className="dashboard-header">
                            <div>
                                <h1 className="heading-gradient">Focus Timer</h1>
                                <p className="subtitle">Stay focused with Pomodoro technique.</p>
                            </div>
                        </header>
                        <div className="full-width-column centered-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <PomodoroTimer />
                        </div>
                    </>
                )}

                {currentView === 'analytics' && (
                    <div className="full-width-column">
                        <AnalyticsView assignments={assignments} exams={exams} />
                    </div>
                )}

                {currentView === 'settings' && (
                    <div className="full-width-column">
                        <SettingsView
                            userProfile={userProfile}
                            onUpdateProfile={setUserProfile}
                            onClearData={handleClearAllData}
                            theme={theme}
                            onThemeChange={setTheme}
                        />
                    </div>
                )}
            </main>

            {/* New Task Modal */}
            <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="Create New Task">
                <form onSubmit={handleAddTask}>
                    <div className="form-group">
                        <label htmlFor="title">Task Title</label>
                        <input type="text" id="title" name="title" required placeholder="e.g. Write Essay Introduction" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" name="subject" required placeholder="e.g. English 101" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input type="date" id="dueDate" name="dueDate" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select id="priority" name="priority">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="secondary-btn" onClick={() => setIsTaskModalOpen(false)}>Cancel</button>
                        <button type="submit" className="submit-btn">Save Task</button>
                    </div>
                </form>
            </Modal>

            {/* New Exam Modal */}
            <Modal isOpen={isExamModalOpen} onClose={() => setIsExamModalOpen(false)} title="Add Exam">
                <form onSubmit={handleAddExam}>
                    <div className="form-group">
                        <label htmlFor="exam-subject">Subject</label>
                        <input type="text" id="exam-subject" name="subject" required placeholder="e.g. Advanced Calculus" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exam-date">Exam Date</label>
                        <input type="date" id="exam-date" name="date" required />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="secondary-btn" onClick={() => setIsExamModalOpen(false)}>Cancel</button>
                        <button type="submit" className="submit-btn">Save Exam</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
