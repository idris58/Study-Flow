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

                {/* Theme Section */}
                <section className="glass-panel settings-section">
                    <h3 className="section-title">🎨 Visual Theme</h3>
                    <p className="settings-info">Choose an aesthetic that matches your focus level.</p>
                    <div className="theme-options">
                        <button
                            className={`theme-chip deep-flow ${theme === 'dark' ? 'active' : ''}`}
                            onClick={() => onThemeChange('dark')}
                        >
                            <span className="theme-preview"></span>
                            Dark Mode
                        </button>
                        <button
                            className={`theme-chip zen ${theme === 'light' ? 'active' : ''}`}
                            onClick={() => onThemeChange('light')}
                        >
                            <span className="theme-preview"></span>
                            Light Mode
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
