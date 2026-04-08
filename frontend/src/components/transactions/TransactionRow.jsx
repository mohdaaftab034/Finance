import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatCurrency } from '../../utils/formatCurrency'

const TransactionRow = ({ index, transaction, isAdmin, onEdit, onDelete }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  return (
    <tr className={`border-b border-gray-100 dark:border-gray-700 ${confirmingDelete ? 'bg-red-50 dark:bg-red-900/20' : ''}`}>
      <td className="px-3 py-3 text-gray-500 dark:text-gray-300">{index}</td>
      <td className="px-3 py-3 text-gray-700 dark:text-gray-200">{format(new Date(transaction.date), 'dd MMM yyyy')}</td>
      <td className="px-3 py-3 font-medium text-gray-900 dark:text-gray-100">{transaction.description}</td>
      <td className="px-3 py-3"><Badge label={transaction.category} /></td>
      <td className="px-3 py-3">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${transaction.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200'}`}>
          {transaction.type}
        </span>
      </td>
      <td className={`px-3 py-3 text-right font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
      </td>
      {isAdmin ? (
        <td className="px-3 py-3">
          {!confirmingDelete ? (
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" leftIcon={<Pencil className="h-4 w-4" />} onClick={() => onEdit(transaction)}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Trash2 className="h-4 w-4 text-red-500" />} onClick={() => setConfirmingDelete(true)}>
                Delete
              </Button>
            </div>
          ) : (
            <div className="flex justify-end gap-2">
              <Button variant="danger" size="sm" onClick={() => onDelete(transaction.id)}>Confirm</Button>
              <Button variant="secondary" size="sm" onClick={() => setConfirmingDelete(false)}>Cancel</Button>
            </div>
          )}
        </td>
      ) : null}
    </tr>
  )
}

TransactionRow.propTypes = {
  index: PropTypes.number.isRequired,
  transaction: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default memo(TransactionRow)
