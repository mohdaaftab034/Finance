import { memo } from 'react'
import PropTypes from 'prop-types'

const InsightCard = ({ title, headline, detail, icon: Icon, colorClass }) => {
  return (
    <article className={`card-base fade-in-up border-l-4 p-4 ${colorClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{headline}</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{detail}</p>
        </div>
        <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-700">
          <Icon className="h-5 w-5 text-primary-600 dark:text-primary-300" />
        </div>
      </div>
    </article>
  )
}

InsightCard.propTypes = {
  title: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  colorClass: PropTypes.string,
}

InsightCard.defaultProps = {
  colorClass: 'border-primary-400',
}

export default memo(InsightCard)
