import { useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { useFinanceStore } from '../store/useFinanceStore'

const monthLabels = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06']

export const useInsights = () => {
  const transactions = useFinanceStore((state) => state.transactions)

  return useMemo(() => {
    const monthlyMap = monthLabels.reduce((acc, monthKey) => {
      acc[monthKey] = {
        month: format(parseISO(`${monthKey}-01`), 'MMM'),
        income: 0,
        expenses: 0,
      }
      return acc
    }, {})

    const expenseCategoryMap = {}
    let totalIncomeAllTime = 0
    let totalExpensesAllTime = 0

    let biggestSingleExpense = null

    transactions.forEach((tx) => {
      const monthKey = tx.date.slice(0, 7)
      const absAmount = Math.abs(tx.amount)

      if (monthlyMap[monthKey]) {
        if (tx.type === 'income') {
          monthlyMap[monthKey].income += absAmount
        } else {
          monthlyMap[monthKey].expenses += absAmount
        }
      }

      if (tx.type === 'income') {
        totalIncomeAllTime += absAmount
      } else {
        totalExpensesAllTime += absAmount
        expenseCategoryMap[tx.category] = (expenseCategoryMap[tx.category] || 0) + absAmount

        if (!biggestSingleExpense || absAmount > Math.abs(biggestSingleExpense.amount)) {
          biggestSingleExpense = tx
        }
      }
    })

    const monthlyData = Object.values(monthlyMap).map((m) => {
      const savings = m.income - m.expenses
      const savingsRate = m.income ? (savings / m.income) * 100 : 0
      return { ...m, savings, savingsRate }
    })

    const categoryBreakdown = Object.entries(expenseCategoryMap)
      .map(([category, total]) => ({
        category,
        total,
        percentage: totalExpensesAllTime ? (total / totalExpensesAllTime) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total)

    const highestSpendingCategory = categoryBreakdown[0] || null

    const bestSavingsMonth = monthlyData.reduce(
      (best, current) => (current.savings > best.savings ? current : best),
      monthlyData[0] || { month: '-', savings: 0, savingsRate: 0 },
    )

    const averageMonthlySavings =
      monthlyData.reduce((sum, m) => sum + m.savings, 0) / Math.max(monthlyData.length, 1)

    return {
      monthlyData,
      categoryBreakdown,
      highestSpendingCategory,
      bestSavingsMonth,
      biggestSingleExpense,
      averageMonthlySavings,
      totalIncomeAllTime,
      totalExpensesAllTime,
    }
  }, [transactions])
}
