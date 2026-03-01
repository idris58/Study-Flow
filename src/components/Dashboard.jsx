import { useState } from 'react'
import Sidebar from './Sidebar'
import AssignmentTracker from './AssignmentTracker'
import ExamCountdown from './ExamCountdown'
import PomodoroTimer from './PomodoroTimer'
import Modal from './Modal'
import { useLocalStorage } from '../hooks/useLocalStorage'
import './Dashboard.css'

export default function Dashboard() {
    const [assignments, setAssignments] = useLocalStorage('assignments', [
        { id: 1, title: 'Calculus III Midterm Essay', subject: 'Math', dueDate: '2026-03-02', status: 'pending', priority: 'high' },
        { id: 2, title: 'React Project Setup', subject: 'Computer Science', dueDate: '2026-03-05', status: 'in-progress', priority: 'medium' },
        { id: 3, title: 'Read Chapter 4 & 5', subject: 'History', dueDate: '2026-03-10', status: 'completed', priority: 'low' }
    ])

    const [exams, setExams] = useLocalStorage('exams', [
        { id: 1, subject: 'Mathematics', date: '2026-03-12' },
        { id: 2, subject: 'Physics', date: '2026-03-20' }
    ])

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const [isExamModalOpen, setIsExamModalOpen] = useState(false)

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
                const nextStatus = a.status === 'pending' ? 'in-progress' : a.status === 'in-progress' ? 'completed' : 'pending';
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
            date: formData.get('date')
        }
        setExams([...exams, newExam].sort((a, b) => new Date(a.date) - new Date(b.date)))
        setIsExamModalOpen(false)
    }

    const deleteExam = (e, id) => {
        e.stopPropagation()
        setExams(exams.filter(e => e.id !== id))
    }

    return (
        <>
            <Sidebar />
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <div>
                        <h1 className="heading-gradient">Welcome back, Student!</h1>
                        <p className="subtitle">Let's make today productive.</p>
                    </div>
                    <div className="header-actions">
                        <button className="primary-btn glass-panel" onClick={() => setIsTaskModalOpen(true)}>
                            + New Task
                        </button>
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
                        />
                        <PomodoroTimer />
                    </div>
                </div>
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
