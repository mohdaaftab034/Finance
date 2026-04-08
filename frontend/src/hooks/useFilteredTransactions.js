import { useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useFinanceStore } from '../store/useFinanceStore'
import { isInRange } from '../utils/dateHelpers'

const compareValues = (a, b, order) => {
  if (a === b) return 0
  const result = a > b ? 1 : -1
  return order === 'asc' ? result : -result
}

export const useFilteredTransactions = () => {
  const { transactions, filters } = useFinanceStore(
    useShallow((state) => ({
      transactions: state.transactions,
      filters: state.filters,
    })),
  )
  const [currentPage, setPage] = useState(1)
  const pageSize = 10

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase()

    return transactions
      .filter((tx) => {
        const matchesSearch =
          !search ||
          tx.description.toLowerCase().includes(search) ||
          tx.category.toLowerCase().includes(search)

        const matchesCategory =
          filters.category === 'All' || tx.category === filters.category

        const matchesMultiCategory =
          !filters.categories?.length || filters.categories.includes(tx.category)

        const matchesType = filters.type === 'All' || tx.type === filters.type

        const matchesDate = isInRange(tx.date, filters.dateFrom, filters.dateTo)

        const amountAbs = Math.abs(tx.amount)
        const minAmount = filters.minAmount ? Number(filters.minAmount) : null
        const maxAmount = filters.maxAmount ? Number(filters.maxAmount) : null
        const matchesMin = minAmount === null || amountAbs >= minAmount
        const matchesMax = maxAmount === null || amountAbs <= maxAmount

        return (
          matchesSearch &&
          matchesCategory &&
          matchesMultiCategory &&
          matchesType &&
          matchesDate &&
          matchesMin &&
          matchesMax
        )
      })
      .sort((a, b) => {
        if (filters.sortBy === 'amount') {
          return compareValues(Math.abs(a.amount), Math.abs(b.amount), filters.sortOrder)
        }

        if (filters.sortBy === 'category') {
          return compareValues(a.category, b.category, filters.sortOrder)
        }

        return compareValues(a.date, b.date, filters.sortOrder)
      })
  }, [transactions, filters])

  const totalCount = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const paginated = filtered.slice(startIndex, startIndex + pageSize)

  return {
    transactions: paginated,
    allFilteredTransactions: filtered,
    totalCount,
    totalPages,
    currentPage: safePage,
    pageSize,
    startIndex,
    setPage,
  }
}
