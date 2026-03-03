import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getLocalDateString } from '../utils/dateUtils'
import './PomodoroTimer.css'

export default function PomodoroTimer() {
    const [settings, setSettings] = useLocalStorage('pomodoro-settings', {
        workTime: 25,
        breakTime: 5
    })

    const [analytics, setAnalytics] = useLocalStorage('pomodoro-analytics', () => {
        const today = getLocalDateString();
        return { date: today, focusMinutes: 0 };
    })

    // Check for daily reset on mount without triggering set-state-in-effect
    useEffect(() => {
        const today = getLocalDateString();
        if (analytics.date !== today) {
            setAnalytics({ date: today, focusMinutes: 0 });
        }
    }, []); // Run only on mount



    const [mode, setMode] = useState('work') // 'work' or 'break'
    const [timeLeft, setTimeLeft] = useState(settings.workTime * 60)
    const [isActive, setIsActive] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    // Handle mode switching
    const switchMode = (newMode) => {
        setIsActive(false)
        setMode(newMode)
        setTimeLeft(newMode === 'work' ? settings.workTime * 60 : settings.breakTime * 60)
    }

    const handleSaveSettings = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newWorkTime = parseInt(formData.get('workTime'), 10);
        const newBreakTime = parseInt(formData.get('breakTime'), 10);

        setSettings({
            workTime: newWorkTime,
            breakTime: newBreakTime
        });

        // Sync timeLeft if timer is not active
        if (!isActive) {
            setTimeLeft(mode === 'work' ? newWorkTime * 60 : newBreakTime * 60);
        }

        setShowSettings(false);
    };

    useEffect(() => {
        let timerInterval = null;
        let switchTimeout = null;

        if (isActive && timeLeft > 0) {
            timerInterval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            // Use a small delay for all state updates to avoid set-state-in-effect warning
            switchTimeout = setTimeout(() => {
                setIsActive(false);
                if (mode === 'work') {
                    setAnalytics(prev => ({ ...prev, focusMinutes: prev.focusMinutes + settings.workTime }));
                    setMode('break');
                    setTimeLeft(settings.breakTime * 60);
                } else {
                    setMode('work');
                    setTimeLeft(settings.workTime * 60);
                }
            }, 50);
        }

        return () => {
            if (timerInterval) clearInterval(timerInterval);
            if (switchTimeout) clearTimeout(switchTimeout);
        };
    }, [isActive, timeLeft, mode, settings.workTime, settings.breakTime, setAnalytics]);

    const toggleTimer = () => {
        setIsActive(!isActive)
    }

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(mode === 'work' ? settings.workTime * 60 : settings.breakTime * 60)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const currentTotalSecs = mode === 'work' ? settings.workTime * 60 : settings.breakTime * 60
    const progressPercentage = ((currentTotalSecs - timeLeft) / currentTotalSecs) * 100

    return (
        <section className="glass-panel widget-panel pomodoro-timer">
            <header className="widget-header">
                <h2 className="widget-title">Study Timer</h2>
                <div className="mode-toggle">
                    <button
                        className={`mode-btn ${mode === 'work' ? 'active' : ''}`}
                        onClick={() => switchMode('work')}
                    >
                        Focus
                    </button>
                    <button
                        className={`mode-btn ${mode === 'break' ? 'active' : ''}`}
                        onClick={() => switchMode('break')}
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
