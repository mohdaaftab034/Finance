import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, ChevronLeft, ChevronRight, LayoutDashboard, Moon, Sun, WalletCards } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'
import Badge from '../ui/Badge'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: WalletCards },
  { to: '/insights', label: 'Insights', icon: BarChart3 },
]

const Sidebar = ({ mobileOpen, onCloseMobile, sidebarCollapsed, onToggleSidebar }) => {
  const location = useLocation()
  const role = useFinanceStore((state) => state.role)
  const darkMode = useFinanceStore((state) => state.darkMode)
  const toggleDarkMode = useFinanceStore((state) => state.toggleDarkMode)

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/10 p-2 text-sidebar-textActive dark:bg-black/10">
            <WalletCards className="h-5 w-5" />
          </div>
          <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <p className="text-sm text-sidebar-text">Finance Suite</p>
            <h1 className="text-base font-semibold text-sidebar-textActive">FinTrack</h1>
          </div>
        </div>
        <button
          onClick={onToggleSidebar}
          className="hidden rounded-lg bg-white/10 p-1.5 text-sidebar-text transition hover:bg-sidebar-hover hover:text-sidebar-textActive md:inline-flex"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2 md:p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              title={item.label}
              className={[
                'group relative flex items-center gap-3 rounded-lg border-l-4 px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'border-primary-400 bg-sidebar-active text-sidebar-textActive'
                  : 'border-transparent text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-textActive',
              ].join(' ')}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="space-y-3 border-t border-sidebar-border p-3">
        <button
          onClick={toggleDarkMode}
          className="flex w-full items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-sidebar-text transition hover:bg-sidebar-hover hover:text-sidebar-textActive"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        <div className="flex items-center justify-center">
          <Badge
            label={role === 'admin' ? 'Admin' : 'Viewer'}
            color={
              role === 'admin'
                ? 'bg-amber-100/90 text-amber-900 dark:bg-amber-300/80 dark:text-amber-900'
                : 'bg-indigo-100/90 text-indigo-900 dark:bg-indigo-200/80 dark:text-indigo-900'
            }
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className={`hidden shrink-0 border-r border-sidebar-border bg-sidebar-bg transition-all duration-300 md:flex md:flex-col ${sidebarCollapsed ? 'w-sidebarCollapsed' : 'w-sidebar'} h-screen`}>
        {content}
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onCloseMobile} />
      ) : null}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 border-r border-sidebar-border bg-sidebar-bg transition-transform md:hidden',
          `${sidebarCollapsed ? 'w-sidebarCollapsed' : 'w-sidebar'}`,
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {content}
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  onCloseMobile: PropTypes.func.isRequired,
  sidebarCollapsed: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
}

export default Sidebar
