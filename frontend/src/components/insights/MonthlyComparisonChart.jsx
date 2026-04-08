import PropTypes from 'prop-types'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'

const MonthlyComparisonChart = ({ data, darkMode }) => {
  const tickColor = darkMode ? '#e5e7eb' : '#374151'
  const gridColor = darkMode ? '#374151' : '#e5e7eb'

  return (
    <section className="card-base p-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Month-by-Month Comparison</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: tickColor }} />
            <YAxis tick={{ fill: tickColor }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend wrapperStyle={{ color: tickColor }} />
            <Bar dataKey="income" fill="#16a34a" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

MonthlyComparisonChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  darkMode: PropTypes.bool.isRequired,
}

export default MonthlyComparisonChart
