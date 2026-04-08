import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronDown, Filter, X } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const TransactionFilters = ({ categories, filters, setFilters, resetFilters }) => {
  const [openOnMobile, setOpenOnMobile] = useState(false)
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false)

  const controlClass =
    'h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 shadow-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-primary-900/40'

  const activeCount = useMemo(() => {
    let count = 0
    if (filters.search) count += 1
    if (filters.category !== 'All') count += 1
    if (filters.categories?.length) count += 1
    if (filters.type !== 'All') count += 1
    if (filters.dateFrom || filters.dateTo) count += 1
    if (filters.minAmount || filters.maxAmount) count += 1
    return count
  }, [filters])

  const removeChip = (key, value) => {
    if (key === 'categories') {
      setFilters({ categories: filters.categories.filter((c) => c !== value) })
      return
    }
    const resetMap = {
      search: '',
      category: 'All',
      type: 'All',
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: '',
    }
    setFilters({ [key]: resetMap[key] })
  }

  return (
    <section className="card-base p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between md:hidden">
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<Filter className="h-4 w-4" />}
          onClick={() => setOpenOnMobile((v) => !v)}
        >
          Filters
        </Button>
        {activeCount > 0 ? (
          <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
            {activeCount}
          </span>
        ) : null}
      </div>

      <div className={`${openOnMobile ? 'block' : 'hidden'} space-y-4 md:block`}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Filters</p>
          {activeCount > 0 ? (
            <span className="hidden rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-200 md:inline-flex">
              {activeCount} active
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Search</span>
            <input
              value={filters.search}
              onChange={(event) => setFilters({ search: event.target.value })}
              placeholder="Description or category"
              className={`${controlClass} w-full`}
            />
          </label>

          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Category</span>
            <select
              value={filters.category}
              onChange={(event) => setFilters({ category: event.target.value })}
              className={`${controlClass} w-full`}
            >
              <option value="All">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Type</span>
            <select
              value={filters.type}
              onChange={(event) => setFilters({ type: event.target.value })}
              className={`${controlClass} w-full`}
            >
              <option value="All">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <div className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Date range</span>
            <div className="flex gap-2">
              <input type="date" value={filters.dateFrom} onChange={(event) => setFilters({ dateFrom: event.target.value })} className={`${controlClass} w-full px-2`} />
              <input type="date" value={filters.dateTo} onChange={(event) => setFilters({ dateTo: event.target.value })} className={`${controlClass} w-full px-2`} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <button
              onClick={() => setOpenCategoryMenu((v) => !v)}
              className={`${controlClass} flex w-full items-center justify-between text-left`}
            >
              <span>Multi-select categories ({filters.categories?.length || 0})</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {openCategoryMenu ? (
              <div className="absolute left-0 right-0 z-20 mt-2 max-h-44 overflow-auto rounded-lg border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-600 dark:bg-gray-800">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <input
                      type="checkbox"
                      checked={filters.categories?.includes(category)}
                      onChange={(event) => {
                        const current = filters.categories || []
                        const next = event.target.checked
                          ? [...current, category]
                          : current.filter((entry) => entry !== category)
                        setFilters({ categories: next })
                      }}
                    />
                    {category}
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Amount range</span>
            <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min amount"
              value={filters.minAmount}
              onChange={(event) => setFilters({ minAmount: event.target.value })}
                className={`${controlClass} w-full`}
            />
            <input
              type="number"
              placeholder="Max amount"
              value={filters.maxAmount}
              onChange={(event) => setFilters({ maxAmount: event.target.value })}
                className={`${controlClass} w-full`}
            />
            </div>
          </div>

          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Sort by</span>
            <select
              value={filters.sortBy}
              onChange={(event) => setFilters({ sortBy: event.target.value })}
              className={`${controlClass} w-full`}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </label>

          <div className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Actions</span>
            <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="w-full"
              onClick={() => setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            >
              {filters.sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </Button>
            <Button size="sm" variant="ghost" className="w-full" onClick={resetFilters}>Reset</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
          {filters.search ? <FilterChip label={`Search: ${filters.search}`} onClear={() => removeChip('search')} /> : null}
          {filters.category !== 'All' ? <FilterChip label={`Category: ${filters.category}`} onClear={() => removeChip('category')} /> : null}
          {filters.type !== 'All' ? <FilterChip label={`Type: ${filters.type}`} onClear={() => removeChip('type')} /> : null}
          {filters.dateFrom ? <FilterChip label={`From: ${filters.dateFrom}`} onClear={() => removeChip('dateFrom')} /> : null}
          {filters.dateTo ? <FilterChip label={`To: ${filters.dateTo}`} onClear={() => removeChip('dateTo')} /> : null}
          {filters.minAmount ? <FilterChip label={`Min: ${filters.minAmount}`} onClear={() => removeChip('minAmount')} /> : null}
          {filters.maxAmount ? <FilterChip label={`Max: ${filters.maxAmount}`} onClear={() => removeChip('maxAmount')} /> : null}
          {(filters.categories || []).map((category) => (
            <FilterChip key={category} label={category} onClear={() => removeChip('categories', category)} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FilterChip = ({ label, onClear }) => {
  return (
    <button className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-gray-50 px-2 py-1 text-xs text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600" onClick={onClear}>
      <Badge label={label} color="bg-transparent p-0 text-gray-700 dark:text-gray-200" />
      <X className="h-3 w-3" />
    </button>
  )
}

FilterChip.propTypes = {
  label: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
}

TransactionFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
}

export default TransactionFilters
