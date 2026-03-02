import { useState, useEffect, useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import './PomodoroTimer.css'

export default function PomodoroTimer() {
    const [settings, setSettings] = useLocalStorage('pomodoro-settings', {
        workTime: 25,
        breakTime: 5
    })

    const todayStr = new Date().toISOString().split('T')[0];
    const [analytics, setAnalytics] = useLocalStorage('pomodoro-analytics', {
        date: todayStr,
        focusMinutes: 0
    })

    // Auto-reset daily analytics if it's a new day
    useEffect(() => {
        if (analytics.date !== todayStr) {
            setAnalytics({ date: todayStr, focusMinutes: 0 })
        }
    }, [todayStr, analytics.date, setAnalytics])

    const WORK_SEC = settings.workTime * 60;
    const BREAK_SEC = settings.breakTime * 60;

    const [timeLeft, setTimeLeft] = useState(WORK_SEC)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState('work') // 'work' or 'break'
    const [showSettings, setShowSettings] = useState(false)

    // Keep timeLeft in sync when modifying settings (if not active)
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(mode === 'work' ? WORK_SEC : BREAK_SEC)
        }
    }, [WORK_SEC, BREAK_SEC, mode, isActive])

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1)
            }, 1000)
        } else if (isActive && timeLeft === 0) {
            // Auto switch modes or stop timer
            setIsActive(false)
            if (mode === 'work') {
                setAnalytics(prev => ({ ...prev, focusMinutes: prev.focusMinutes + settings.workTime }))
                setMode('break')
                setTimeLeft(BREAK_SEC)
            } else {
                setMode('work')
                setTimeLeft(WORK_SEC)
            }
        }
        return () => clearInterval(interval)
    }, [isActive, timeLeft, mode, BREAK_SEC, WORK_SEC, settings.workTime, setAnalytics])

    const handleSaveSettings = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setSettings({
            workTime: parseInt(formData.get('workTime'), 10),
            breakTime: parseInt(formData.get('breakTime'), 10)
        });
        setShowSettings(false);
    };

    const toggleTimer = () => {
        setIsActive(!isActive)
    }

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(mode === 'work' ? WORK_SEC : BREAK_SEC)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const currentTotalSecs = mode === 'work' ? WORK_SEC : BREAK_SEC
    const progressPercentage = ((currentTotalSecs - timeLeft) / currentTotalSecs) * 100

    return (
        <section className="glass-panel widget-panel pomodoro-timer">
            <header className="widget-header">
                <h2 className="widget-title">Study Timer</h2>
                <div className="mode-toggle">
                    <button
                        className={`mode-btn ${mode === 'work' ? 'active' : ''}`}
                        onClick={() => { setMode('work'); setTimeLeft(WORK_SEC); setIsActive(false); }}
                    >
                        Focus
                    </button>
                    <button
                        className={`mode-btn ${mode === 'break' ? 'active' : ''}`}
                        onClick={() => { setMode('break'); setTimeLeft(BREAK_SEC); setIsActive(false); }}
                    >
                        Break
                    </button>
                    <button
                        className={`mode-btn settings-btn ${showSettings ? 'active' : ''}`}
                        onClick={() => setShowSettings(!showSettings)}
                        title="Timer Settings"
                    >
                        ⚙️
                    </button>
                </div>
            </header>

            {showSettings && (
                <div className="pomodoro-settings-panel">
                    <form onSubmit={handleSaveSettings}>
                        <div className="settings-row">
                            <label>
                                Focus (min):
                                <input type="number" name="workTime" defaultValue={settings.workTime} min="1" max="120" />
                            </label>
                            <label>
                                Break (min):
                                <input type="number" name="breakTime" defaultValue={settings.breakTime} min="1" max="60" />
                            </label>
                        </div>
                        <button type="submit" className="save-settings-btn">Save</button>
                    </form>
                </div>
            )}

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

            <div className="daily-analytics">
                <span className="analytics-label">Today's Focus:</span>
                <span className="analytics-value">
                    {Math.floor(analytics.focusMinutes / 60)}h {analytics.focusMinutes % 60}m
                </span>
            </div>
        </section>
    )
}
