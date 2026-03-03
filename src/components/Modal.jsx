import { useEffect, useRef } from 'react'
import './Modal.css'

export default function Modal({ isOpen, onClose, title, children }) {
    const modalRef = useRef(null)

    useEffect(() => {
        if (!isOpen) return

        // Handle Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }

        // Focus trapping
        const modalElement = modalRef.current
        const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        const handleTab = (e) => {
            if (e.key !== 'Tab') return

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement.focus()
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()
                }
            }
        }

        document.addEventListener('keydown', handleEscape)
        modalElement.addEventListener('keydown', handleTab)

        // Initial focus
        if (firstElement) firstElement.focus()

        return () => {
            document.removeEventListener('keydown', handleEscape)
            modalElement.removeEventListener('keydown', handleTab)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const titleId = `modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="presentation"
        >
            <div
                ref={modalRef}
                className="modal-content glass-panel"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >
                <header className="modal-header">
                    <h2 id={titleId} className="modal-title">{title}</h2>
                    <button
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >&times;</button>
                </header>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}
