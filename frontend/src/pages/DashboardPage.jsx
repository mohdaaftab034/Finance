import { useMemo } from 'react'
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import SummaryCard from '../components/dashboard/SummaryCard'
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart'
import SpendingPieChart from '../components/dashboard/SpendingPieChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import { useInsights } from '../hooks/useInsights'
import { useFinanceStore } from '../store/useFinanceStore'

const trendText = (current, previous) => {
  if (!previous) return '+0.0% vs last month'
  const delta = ((current - previous) / previous) * 100
  const sign = delta >= 0 ? '+' : ''
  return `${sign}${delta.toFixed(1)}% vs last month`
}

const DashboardPage = () => {
  const { monthlyData, categoryBreakdown } = useInsights()
  const transactions = useFinanceStore((state) => state.transactions)
  const darkMode = useFinanceStore((state) => state.darkMode)

  const summary = useMemo(() => {
    const totalIncome = transactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
    const totalExpenses = transactions.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
    const totalBalance = totalIncome - totalExpenses
    const savingsRate = totalIncome ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

    const last = monthlyData[monthlyData.length - 1]
    const prev = monthlyData[monthlyData.length - 2]

    return {
      totalIncome,
      totalExpenses,
      totalBalance,
      savingsRate,
      trendBalance: trendText(last?.savings || 0, prev?.savings || 0),
      trendIncome: trendText(last?.income || 0, prev?.income || 0),
      trendExpense: trendText(last?.expenses || 0, prev?.expenses || 0),
      trendSavingsRate: trendText(last?.savingsRate || 0, prev?.savingsRate || 0),
    }
  }, [transactions, monthlyData])

  const recentTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  }, [transactions])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <SummaryCard label="Total Balance" value={summary.totalBalance} icon={Wallet} colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200" trendText={summary.trendBalance} trendPositive={!summary.trendBalance.startsWith('-')} delay={0} />
        <SummaryCard label="Total Income" value={summary.totalIncome} icon={TrendingUp} colorClass="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-200" trendText={summary.trendIncome} trendPositive={!summary.trendIncome.startsWith('-')} delay={40} />
        <SummaryCard label="Total Expenses" value={summary.totalExpenses} icon={TrendingDown} colorClass="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-200" trendText={summary.trendExpense} trendPositive={summary.trendExpense.startsWith('-')} delay={80} />
        <SummaryCard label="Savings Rate" value={summary.savingsRate} icon={PiggyBank} colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-200" trendText={summary.trendSavingsRate} trendPositive={!summary.trendSavingsRate.startsWith('-')} delay={120} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3"><BalanceTrendChart data={monthlyData} darkMode={darkMode} /></div>
        <div className="xl:col-span-2"><SpendingPieChart data={categoryBreakdown} /></div>
      </div>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  )
}

export default DashboardPage
