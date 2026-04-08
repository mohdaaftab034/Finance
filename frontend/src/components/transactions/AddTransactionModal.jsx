import { useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { categories } from '../../data/mockData'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

const AddTransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: categories[0],
    type: 'expense',
    date: '',
    note: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}
    if (!form.description.trim()) nextErrors.description = 'Description is required'
    if (!form.date) nextErrors.date = 'Date is required'
    if (!form.amount || Number(form.amount) <= 0) nextErrors.amount = 'Amount must be positive'
    if (!form.category) nextErrors.category = 'Category is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    onSubmit({
      id: crypto.randomUUID(),
      ...form,
      amount: Number(form.amount),
    })

    toast.success('Transaction added successfully')
    setForm({ description: '', amount: '', category: categories[0], type: 'expense', date: '', note: '' })
    setErrors({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <Field label="Description" error={errors.description}>
          <input value={form.description} onChange={(event) => setForm((v) => ({ ...v, description: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700" />
        </Field>

        <Field label="Amount" error={errors.amount}>
          <input type="number" value={form.amount} onChange={(event) => setForm((v) => ({ ...v, amount: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700" />
        </Field>

        <Field label="Category" error={errors.category}>
          <select value={form.category} onChange={(event) => setForm((v) => ({ ...v, category: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </Field>

        <div>
          <p className="mb-1 text-sm font-medium">Type</p>
          <div className="flex gap-2">
            {['income', 'expense'].map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm">
                <input type="radio" name="type" checked={form.type === type} onChange={() => setForm((v) => ({ ...v, type }))} />
                {type}
              </label>
            ))}
          </div>
        </div>

        <Field label="Date" error={errors.date}>
          <input type="date" value={form.date} onChange={(event) => setForm((v) => ({ ...v, date: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700" />
        </Field>

        <div>
          <p className="mb-1 text-sm font-medium">Note (optional)</p>
          <textarea value={form.note} onChange={(event) => setForm((v) => ({ ...v, note: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700" rows={3} />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Transaction</Button>
        </div>
      </form>
    </Modal>
  )
}

const Field = ({ label, error, children }) => (
  <div>
    <p className="mb-1 text-sm font-medium">{label}</p>
    {children}
    {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
  </div>
)

Field.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Field.defaultProps = {
  error: '',
}

AddTransactionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddTransactionModal
