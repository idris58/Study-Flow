# Study Flow

Stay in Your Study Flow. Plan Smart. Achieve More.

Study Flow is a modern productivity planner for school and university students. It helps you organize assignments, track exam deadlines, and run focused study sessions from one clean interface.

## Overview

Managing classes, assignments, and exams can get messy fast. Study Flow combines planning and focus tools into a single web app so students can keep momentum and reduce deadline stress.

## Current Features

- Assignment tracker
- Create tasks with subject, due date, and priority
- Mark tasks as pending or completed
- Persistent local storage for saved tasks
- Exam countdown
- Add upcoming exams and view days remaining
- Sorted exam timeline
- Pomodoro timer
- Focus/break modes (25/5 by default)
- Start, pause, and reset controls
- Responsive dashboard
- Sidebar navigation for dashboard, assignments, exams, and timer views

## Tech Stack

- React 19
- Vite 7
- CSS (component-scoped styles)
- Browser Local Storage

## Project Structure

```text
src/
  components/
    AssignmentTracker.jsx
    Dashboard.jsx
    ExamCountdown.jsx
    Modal.jsx
    PomodoroTimer.jsx
    Sidebar.jsx
  hooks/
    useLocalStorage.js
  App.jsx
  main.jsx
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Notes

- Data is currently stored in the browser (`localStorage`).
- This project is currently a frontend-only MVP.
- README reflects the current codebase state.

## License

This project is private for now.
