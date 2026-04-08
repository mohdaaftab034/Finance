import { useMemo } from 'react'
import { AlertTriangle, CircleDollarSign, Trophy } from 'lucide-react'
import InsightCard from '../components/insights/InsightCard'
import MonthlyComparisonChart from '../components/insights/MonthlyComparisonChart'
import CategoryBreakdown from '../components/insights/CategoryBreakdown'
import Badge from '../components/ui/Badge'
import { useInsights } from '../hooks/useInsights'
import { useFinanceStore } from '../store/useFinanceStore'
import { formatCurrency } from '../utils/formatCurrency'

const InsightsPage = () => {
  const {
    monthlyData,
    categoryBreakdown,
    highestSpendingCategory,
    bestSavingsMonth,
    biggestSingleExpense,
    averageMonthlySavings,
  } = useInsights()

  const darkMode = useFinanceStore((state) => state.darkMode)

  const summary = useMemo(() => {
    const sortedBySavings = [...monthlyData].sort((a, b) => b.savings - a.savings)
    const best = sortedBySavings[0]
    const worst = sortedBySavings[sortedBySavings.length - 1]
    return { best, worst }
  }, [monthlyData])

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InsightCard
          title="Highest Spending Category"
          headline={highestSpendingCategory?.category || '-'}
          detail={`${formatCurrency(highestSpendingCategory?.total || 0)} (${(highestSpendingCategory?.percentage || 0).toFixed(1)}% of expenses)`}
          icon={CircleDollarSign}
          colorClass="border-orange-400"
        />
        <InsightCard
          title="Best Savings Month"
          headline={bestSavingsMonth?.month || '-'}
          detail={`${formatCurrency(bestSavingsMonth?.savings || 0)} saved (${(bestSavingsMonth?.savingsRate || 0).toFixed(1)}%)`}
          icon={Trophy}
          colorClass="border-green-400"
        />
        <InsightCard
          title="Biggest Single Expense"
          headline={biggestSingleExpense?.description || '-'}
          detail={`${formatCurrency(Math.abs(biggestSingleExpense?.amount || 0))} on ${biggestSingleExpense?.date || '-'}`}
          icon={AlertTriangle}
          colorClass="border-red-400"
        />
      </section>

      <MonthlyComparisonChart data={monthlyData} darkMode={darkMode} />

      <div className="card-base p-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Best month: <strong>{summary.best?.month || '-'}</strong> | Worst month: <strong>{summary.worst?.month || '-'}</strong> | Average savings: <strong>{formatCurrency(averageMonthlySavings)}</strong>
        </p>
        {biggestSingleExpense ? (
          <div className="mt-2">
            Largest expense category for single transaction: <Badge label={biggestSingleExpense.category} />
          </div>
        ) : null}
      </div>

      <CategoryBreakdown categoryData={categoryBreakdown} monthlyData={monthlyData} darkMode={darkMode} />
    </div>
  )
}

export default InsightsPage
