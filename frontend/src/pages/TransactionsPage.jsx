import { useCallback, useMemo, useState } from 'react'
import { Download, FileJson, FileSpreadsheet, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { categories } from '../data/mockData'
import { useFilteredTransactions } from '../hooks/useFilteredTransactions'
import { useFinanceStore } from '../store/useFinanceStore'
import { exportToCSV, exportToJSON } from '../utils/exportData'
import Button from '../components/ui/Button'
import AddTransactionModal from '../components/transactions/AddTransactionModal'
import EditTransactionModal from '../components/transactions/EditTransactionModal'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'

const TransactionsPage = () => {
  const { filters, role, addTransaction, updateTransaction, deleteTransaction, setFilters, resetFilters } =
    useFinanceStore(
      useShallow((state) => ({
        filters: state.filters,
        role: state.role,
        addTransaction: state.addTransaction,
        updateTransaction: state.updateTransaction,
        deleteTransaction: state.deleteTransaction,
        setFilters: state.setFilters,
        resetFilters: state.resetFilters,
      })),
    )

  const { transactions, allFilteredTransactions, totalCount, totalPages, currentPage, startIndex, setPage } =
    useFilteredTransactions()

  const isAdmin = role === 'admin'
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [showExportMenu, setShowExportMenu] = useState(false)

  const handleEdit = useCallback((transaction) => {
    setEditingTransaction(transaction)
    setEditOpen(true)
  }, [])

  const handleDelete = useCallback(
    (id) => {
      deleteTransaction(id)
      toast.success('Transaction deleted')
    },
    [deleteTransaction],
  )

  const exportCountLabel = useMemo(() => `${allFilteredTransactions.length} filtered`, [allFilteredTransactions.length])

  return (
    <div className="space-y-6">
      <section className="card-base overflow-visible p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Transactions</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Track spending, apply filters, and export the current result set.
            </p>
          </div>
          <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => setShowExportMenu((v) => !v)}
              className="min-w-[9rem]"
            >
              Export ({exportCountLabel})
            </Button>
            {showExportMenu ? (
              <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-600 dark:bg-gray-800">
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700" onClick={() => { exportToCSV(allFilteredTransactions); setShowExportMenu(false) }}>
                  <FileSpreadsheet className="h-4 w-4" /> CSV
                </button>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700" onClick={() => { exportToJSON(allFilteredTransactions); setShowExportMenu(false) }}>
                  <FileJson className="h-4 w-4" /> JSON
                </button>
              </div>
            ) : null}
          </div>

          {isAdmin ? (
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setAddOpen(true)}>
              Add Transaction
            </Button>
          ) : null}
        </div>
        </div>
      </section>

      <TransactionFilters categories={categories} filters={filters} setFilters={setFilters} resetFilters={resetFilters} />

      <TransactionTable
        transactions={transactions}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={handleDelete}
        startIndex={startIndex}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setPage}
      />

      <AddTransactionModal isOpen={addOpen} onClose={() => setAddOpen(false)} onSubmit={addTransaction} />
      <EditTransactionModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        transaction={editingTransaction}
        onSubmit={updateTransaction}
      />
    </div>
  )
}

export default TransactionsPage
