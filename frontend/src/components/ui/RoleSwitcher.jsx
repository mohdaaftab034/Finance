import PropTypes from 'prop-types'
import { ShieldCheck, UserRound } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'

const RoleSwitcher = ({ compact }) => {
  const role = useFinanceStore((state) => state.role)
  const setRole = useFinanceStore((state) => state.setRole)

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      {role === 'admin' ? (
        <ShieldCheck className="h-4 w-4 text-amber-500" />
      ) : (
        <UserRound className="h-4 w-4 text-sky-500" />
      )}
      {!compact && <span className="hidden text-gray-600 dark:text-gray-300 sm:inline">Role</span>}
      <select
        value={role}
        onChange={(event) => setRole(event.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
    </label>
  )
}

RoleSwitcher.propTypes = {
  compact: PropTypes.bool,
}

RoleSwitcher.defaultProps = {
  compact: false,
}

export default RoleSwitcher
