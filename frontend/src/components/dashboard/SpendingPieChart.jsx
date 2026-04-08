import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'

const colors = ['#f97316', '#0ea5e9', '#ec4899', '#8b5cf6', '#ef4444', '#eab308', '#14b8a6', '#f59e0b', '#6366f1', '#22c55e']

const SpendingPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <section className="card-base fade-in-up p-4" style={{ animationDelay: '80ms' }}>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Spending by Category</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                outerRadius={100}
                innerRadius={50}
                paddingAngle={2}
                onMouseEnter={(_, idx) => setActiveIndex(idx)}
                activeIndex={activeIndex}
                activeShape={(props) => <Pie {...props} outerRadius={108} />}
                isAnimationActive
              >
                {data.map((entry, index) => (
                  <Cell key={entry.category} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li key={item.category} className="flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                {item.category}
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{item.percentage.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

SpendingPieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(SpendingPieChart)
