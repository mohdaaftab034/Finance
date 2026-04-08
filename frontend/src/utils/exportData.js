import { format } from 'date-fns'

const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export const exportToCSV = (transactions) => {
  const header = ['id', 'date', 'description', 'amount', 'category', 'type', 'note']
  const rows = transactions.map((tx) =>
    [
      tx.id,
      tx.date,
      `"${(tx.description || '').replace(/"/g, '""')}"`,
      tx.amount,
      tx.category,
      tx.type,
      `"${(tx.note || '').replace(/"/g, '""')}"`,
    ].join(','),
  )
  const csv = [header.join(','), ...rows].join('\n')
  const filename = `transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`
  triggerDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), filename)
}

export const exportToJSON = (transactions) => {
  const filename = `transactions-${format(new Date(), 'yyyy-MM-dd')}.json`
  triggerDownload(
    new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' }),
    filename,
  )
}
