import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockData'

const defaultFilters = {
  search: '',
  category: 'All',
  type: 'All',
  dateFrom: '',
  dateTo: '',
  sortBy: 'date',
  sortOrder: 'desc',
  categories: [],
  minAmount: '',
  maxAmount: '',
}

export const useFinanceStore = create(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: 'admin',
      filters: defaultFilters,
      darkMode: false,
      addTransaction: (tx) =>
        set((state) => {
          const normalizedAmount =
            tx.type === 'expense' ? -Math.abs(Number(tx.amount)) : Math.abs(Number(tx.amount))
          return {
            transactions: [{ ...tx, amount: normalizedAmount }, ...state.transactions],
          }
        }),
      updateTransaction: (id, data) =>
        set((state) => ({
          transactions: state.transactions.map((tx) => {
            if (tx.id !== id) return tx
            const merged = { ...tx, ...data }
            if (Object.hasOwn(merged, 'amount') && Object.hasOwn(merged, 'type')) {
              merged.amount =
                merged.type === 'expense'
                  ? -Math.abs(Number(merged.amount))
                  : Math.abs(Number(merged.amount))
            }
            return merged
          }),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
      setFilters: (partial) =>
        set((state) => ({
          filters: { ...state.filters, ...partial },
        })),
      resetFilters: () => set(() => ({ filters: defaultFilters })),
      setRole: (role) => set(() => ({ role })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'fintrack-store',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
        filters: state.filters,
      }),
    }, 
  ),
)
