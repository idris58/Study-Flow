import { useState, useEffect } from 'react'
import './PomodoroTimer.css'

export default function PomodoroTimer() {
    const WORK_TIME = 25 * 60; // 25 minutes
    const BREAK_TIME = 5 * 60; // 5 minutes

    const [timeLeft, setTimeLeft] = useState(WORK_TIME)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState('work') // 'work' or 'break'

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            // Auto switch modes or stop timer
            setIsActive(false)
            if (mode === 'work') {
                setMode('break')
                setTimeLeft(BREAK_TIME)
            } else {
                setMode('work')
                setTimeLeft(WORK_TIME)
            }
        }
        return () => clearInterval(interval)
    }, [isActive, timeLeft, mode])

    const toggleTimer = () => {
        setIsActive(!isActive)
    }

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const progressPercentage = ((mode === 'work' ? WORK_TIME - timeLeft : BREAK_TIME - timeLeft) / (mode === 'work' ? WORK_TIME : BREAK_TIME)) * 100

    return (
        <section className="glass-panel widget-panel pomodoro-timer">
            <header className="widget-header">
                <h2 className="widget-title">Study Timer</h2>
                <div className="mode-toggle">
                    <button
                        className={`mode-btn ${mode === 'work' ? 'active' : ''}`}
                        onClick={() => { setMode('work'); setTimeLeft(WORK_TIME); setIsActive(false); }}
                    >
                        Focus
                    </button>
                    <button
                        className={`mode-btn ${mode === 'break' ? 'active' : ''}`}
                        onClick={() => { setMode('break'); setTimeLeft(BREAK_TIME); setIsActive(false); }}
                    >
                        Break
                    </button>
                </div>
            </header>

            <div className="timer-display">
                <div className={`timer-circle ${isActive ? 'active' : ''} ${mode}`}>
                    <svg className="progress-ring" width="200" height="200">
                        <circle
                            className="progress-ring-bg"
                            strokeWidth="8"
                            fill="transparent"
                            r="90"
                            cx="100"
                            cy="100"
                        />
                        <circle
                            className="progress-ring-progress"
                            strokeWidth="8"
                            fill="transparent"
                            r="90"
                            cx="100"
                            cy="100"
                            style={{
                                strokeDasharray: `${2 * Math.PI * 90}`,
                                strokeDashoffset: `${2 * Math.PI * 90 * (1 - progressPercentage / 100)}`
                            }}
                        />
                    </svg>
                    <div className="time-left">{formatTime(timeLeft)}</div>
                </div>
            </div>

            <div className="timer-controls">
                <button className="control-btn play-btn" onClick={toggleTimer}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="control-btn reset-btn" onClick={resetTimer}>
                    Reset
                </button>
            </div>
        </section>
    )
}
