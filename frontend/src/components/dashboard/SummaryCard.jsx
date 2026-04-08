import { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatCurrency } from '../../utils/formatCurrency'

const SummaryCard = ({ label, value, icon: Icon, colorClass, trendText, trendPositive, delay }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 700
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplayValue(value * progress)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [value])

  return (
    <article
      className="fade-in-up card-base group p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100 md:text-2xl">
            {label === 'Savings Rate' ? `${displayValue.toFixed(1)}%` : formatCurrency(displayValue)}
          </p>
        </div>
        <div className={`rounded-full p-2 ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className={`mt-2 text-xs ${trendPositive ? 'text-green-600' : 'text-red-600'}`}>{trendText}</p>
    </article>
  )
}

SummaryCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  colorClass: PropTypes.string.isRequired,
  trendText: PropTypes.string.isRequired,
  trendPositive: PropTypes.bool,
  delay: PropTypes.number,
}

SummaryCard.defaultProps = {
  trendPositive: true,
  delay: 0,
}

export default memo(SummaryCard)
