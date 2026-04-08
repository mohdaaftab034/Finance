import PropTypes from 'prop-types'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'

const colors = ['#f97316', '#0ea5e9', '#ec4899', '#8b5cf6', '#ef4444', '#eab308', '#14b8a6', '#f59e0b', '#6366f1', '#22c55e']

const CategoryBreakdown = ({ categoryData, monthlyData, darkMode }) => {
  const tickColor = darkMode ? '#e5e7eb' : '#374151'
  const gridColor = darkMode ? '#374151' : '#e5e7eb'

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <section className="card-base p-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Spending by Category - All Time</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fill: tickColor }} />
              <YAxis dataKey="category" type="category" tick={{ fill: tickColor }} width={90} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={entry.category} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card-base p-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Spending Trend Over Time</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: tickColor }} />
              <YAxis tick={{ fill: tickColor }} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Area type="monotone" dataKey="expenses" fill="#f9731622" stroke="#f97316" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

CategoryBreakdown.propTypes = {
  categoryData: PropTypes.arrayOf(PropTypes.object).isRequired,
  monthlyData: PropTypes.arrayOf(PropTypes.object).isRequired,
  darkMode: PropTypes.bool.isRequired,
}

export default CategoryBreakdown
