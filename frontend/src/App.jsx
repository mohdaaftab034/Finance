import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'))
const InsightsPage = lazy(() => import('./pages/InsightsPage'))

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
          Loading dashboard...
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
