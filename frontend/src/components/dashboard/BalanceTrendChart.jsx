import { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Area,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'

const BalanceTrendChart = ({ data, darkMode }) => {
  const tickColor = darkMode ? '#e5e7eb' : '#374151'
  const gridColor = darkMode ? '#374151' : '#e5e7eb'

  return (
    <section className="card-base fade-in-up p-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
        Income vs Expenses - Last 6 Months
      </h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} />
            <YAxis tick={{ fill: tickColor, fontSize: 12 }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend wrapperStyle={{ color: tickColor }} verticalAlign="top" />
            <Area type="monotone" dataKey="income" fill="#16a34a22" stroke="none" />
            <Area type="monotone" dataKey="expenses" fill="#ef444422" stroke="none" />
            <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

BalanceTrendChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  darkMode: PropTypes.bool.isRequired,
}

export default memo(BalanceTrendChart)
