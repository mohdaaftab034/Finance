import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useFinanceStore } from '../../store/useFinanceStore'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const titleMap = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
}

const Layout = () => {
  const darkMode = useFinanceStore((state) => state.darkMode)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  const pageTitle = useMemo(() => titleMap[location.pathname] || 'FinTrack', [location.pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="flex h-screen bg-page-bg">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} sidebarCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar title={pageTitle} onMenuClick={() => setMobileOpen(true)} sidebarCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
