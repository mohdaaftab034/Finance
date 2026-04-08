import PropTypes from 'prop-types'
import Button from './Button'

const EmptyState = ({ icon, heading, subtext, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-10 text-center dark:border-gray-600 dark:bg-gray-800">
      <div className="mb-3 rounded-full bg-gray-100 p-4 text-gray-500 dark:bg-gray-700 dark:text-gray-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{heading}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{subtext}</p>
      {actionLabel && onAction ? (
        <Button className="mt-4" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

EmptyState.propTypes = {
  icon: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
}

EmptyState.defaultProps = {
  actionLabel: '',
  onAction: undefined,
}

export default EmptyState
