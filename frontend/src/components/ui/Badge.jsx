import PropTypes from 'prop-types'

const categoryColorMap = {
  Food: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  Transport: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  Shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200',
  Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  Health: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
  Utilities: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
  Salary: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  Freelance: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  Rent: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  Education: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200',
}

const Badge = ({ label, color }) => {
  const classes = color || categoryColorMap[label] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${classes}`}>
      {label}
    </span>
  )
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Badge
