import PropTypes from 'prop-types'
import { FileSearch } from 'lucide-react'
import TransactionRow from './TransactionRow'
import EmptyState from '../ui/EmptyState'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatCurrency } from '../../utils/formatCurrency'

const MobileCard = ({ tx, isAdmin, onEdit, onDelete }) => {
  return (
    <article className="card-base space-y-2 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{tx.description}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
        </div>
        <Badge label={tx.category} />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className={`rounded-full px-2 py-0.5 ${tx.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200'}`}>
          {tx.type}
        </span>
        <span className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {tx.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
        </span>
      </div>
      {isAdmin ? (
        <div className="flex gap-2 pt-1">
          <Button size="sm" variant="secondary" onClick={() => onEdit(tx)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(tx.id)}>Delete</Button>
        </div>
      ) : null}
    </article>
  )
}

MobileCard.propTypes = {
  tx: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

const TransactionTable = ({
  transactions,
  isAdmin,
  onEdit,
  onDelete,
  startIndex,
  totalCount,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (!transactions.length) {
    return (
      <EmptyState
        icon={<FileSearch className="h-6 w-6" />}
        heading="No transactions found"
        subtext="Try adjusting your filters"
      />
    )
  }

  return (
    <section className="space-y-4">
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600 dark:bg-gray-700/50 dark:text-gray-200">
            <tr>
              <th className="px-3 py-3">#</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Description</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3 text-right">Amount</th>
              {isAdmin ? <th className="px-3 py-3 text-right">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <TransactionRow
                key={tx.id}
                index={startIndex + idx + 1}
                transaction={tx}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {transactions.map((tx) => (
          <MobileCard key={tx.id} tx={tx} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-800 md:flex-row md:items-center">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {Math.min(startIndex + 1, totalCount)}-{Math.min(startIndex + transactions.length, totalCount)} of {totalCount} transactions
        </p>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            Prev
          </Button>
          <span className="text-gray-700 dark:text-gray-200">Page {currentPage} of {totalPages}</span>
          <Button variant="secondary" size="sm" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
            Next
          </Button>
        </div>
      </div>
    </section>
  )
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  startIndex: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default TransactionTable
