import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

const Modal = ({ isOpen, onClose, title, children }) => {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll(focusableSelectors)
    focusables?.[0]?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()

      if (event.key === 'Tab' && focusables?.length) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={panelRef}
        className="animate-modal-in h-full w-full overflow-auto rounded-xl bg-white p-5 shadow-xl dark:bg-gray-800 md:h-auto md:max-h-[90vh] md:max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
