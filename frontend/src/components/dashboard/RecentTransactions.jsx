import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import Badge from '../ui/Badge'
import EmptyState from '../ui/EmptyState'
import { formatCurrency } from '../../utils/formatCurrency'

const RecentTransactions = ({ transactions }) => {
  if (!transactions.length) {
    return (
      <section className="card-base p-4">
        <EmptyState
          icon={<span className="text-xl">📭</span>}
          heading="No recent transactions"
          subtext="Add a transaction to get started."
        />
      </section>
    )
  }

  return (
    <section className="card-base fade-in-up p-4" style={{ animationDelay: '140ms' }}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Recent Transactions</h3>
        <Link className="text-sm font-medium text-primary-600 hover:underline" to="/transactions">
          View all
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-700 dark:text-gray-300">
              <th className="py-2">Date</th>
              <th className="py-2">Description</th>
              <th className="py-2">Category</th>
              <th className="py-2 text-right">Amount</th>
              <th className="py-2 text-right">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-100 dark:border-gray-700/70">
                <td className="py-2 text-gray-600 dark:text-gray-300">{format(new Date(tx.date), 'dd MMM')}</td>
                <td className="py-2 font-medium text-gray-800 dark:text-gray-100">{tx.description}</td>
                <td className="py-2"><Badge label={tx.category} /></td>
                <td className={`py-2 text-right font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
                </td>
                <td className="py-2 text-right">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tx.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200'}`}>
                    {tx.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

RecentTransactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default RecentTransactions
