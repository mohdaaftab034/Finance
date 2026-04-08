import PropTypes from 'prop-types'
import { ChevronRight, Menu, Moon, Sun } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'
import RoleSwitcher from '../ui/RoleSwitcher'

const Topbar = ({ title, onMenuClick, sidebarCollapsed, onToggleSidebar }) => {
  const role = useFinanceStore((state) => state.role)
  const darkMode = useFinanceStore((state) => state.darkMode)
  const toggleDarkMode = useFinanceStore((state) => state.toggleDarkMode)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-page-border bg-page-card/90 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-page-muted hover:bg-page-bg md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        {sidebarCollapsed && (
          <button
            onClick={onToggleSidebar}
            className="hidden rounded-md p-2 text-page-muted hover:bg-page-bg md:inline-flex"
            aria-label="Open sidebar"
            title="Open sidebar"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
        <h2 className="text-lg font-semibold text-page-text">{title}</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <RoleSwitcher compact />
        <button
          onClick={toggleDarkMode}
          className="rounded-md p-2 text-page-muted hover:bg-page-bg"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div
          className={[
            'hidden rounded-full px-2 py-1 text-xs font-semibold sm:inline-flex',
            role === 'admin'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100',
          ].join(' ')}
        >
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
          FT
        </div>
      </div>
    </header>
  )
}

Topbar.propTypes = {
  title: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  sidebarCollapsed: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
}

export default Topbar
