import { useState } from 'react';
import './SettingsView.css';

export default function SettingsView({ userProfile, onUpdateProfile, onClearData, theme, onThemeChange }) {
    const [name, setName] = useState(userProfile.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile({ ...userProfile, name });
        alert('Settings saved!');
    };

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear ALL study data? This cannot be undone.')) {
            onClearData();
            window.location.reload();
        }
    };

    return (
        <div className="settings-container">
            <header className="settings-header">
                <h2 className="heading-gradient">Global Settings</h2>
                <p className="subtitle">Personalize your experience and manage your data.</p>
            </header>

            <div className="settings-grid">
                {/* Profile Section */}
                <section className="glass-panel settings-section">
                    <h3 className="section-title">👤 Profile Personalization</h3>
                    <form onSubmit={handleSubmit} className="settings-form">
                        <div className="form-group">
                            <label htmlFor="user-name">Your Display Name</label>
                            <input
                                type="text"
                                id="user-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>
                        <button type="submit" className="primary-btn glass-panel">Update Profile</button>
                    </form>
                </section>

                {/* Appearance Section */}
                <section className="glass-panel settings-section">
                    <h3 className="section-title">✨ Appearance</h3>
                    <p className="settings-info">Customize how Study Flow looks on your device.</p>
                    <div className="appearance-switcher glass-panel">
                        <button
                            className={`appearance-option ${theme === 'light' ? 'active' : ''}`}
                            onClick={() => onThemeChange('light')}
                        >
                            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <span>Light</span>
                        </button>
                        <button
                            className={`appearance-option ${theme === 'dark' ? 'active' : ''}`}
                            onClick={() => onThemeChange('dark')}
                        >
                            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                            <span>Dark</span>
                        </button>
                        <button
                            className={`appearance-option ${theme === 'system' ? 'active' : ''}`}
                            onClick={() => onThemeChange('system')}
                        >
                            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                            <span>System</span>
                        </button>
                    </div>
                </section>

                {/* Data Management Section */}
                <section className="glass-panel settings-section danger-zone">
                    <h3 className="section-title">⚠️ Data Management</h3>
                    <p className="settings-info">Clear all local storage including assignments, exams, and focus analytics.</p>
                    <button
                        onClick={handleClearData}
                        className="secondary-btn danger-btn"
                    >
                        Reset All Application Data
                    </button>
                </section>

                {/* About Section */}
                <section className="glass-panel settings-section">
                    <h3 className="section-title">ℹ️ About Study Flow</h3>
                    <div className="about-info">
                        <p><strong>Version:</strong> 1.2.0 (Advanced Phase UI)</p>
                        <p><strong>Release Status:</strong> Production Ready</p>
                        <p className="mt-mini">Study Flow is designed to help students track their workload, prepare for exams, and maintain focus using the Pomodoro technique.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
