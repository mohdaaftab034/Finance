import { format, parseISO, isWithinInterval } from 'date-fns'

export const getMonthName = (dateString) => format(parseISO(dateString), 'MMM')

export const getMonthYear = (dateString) => format(parseISO(dateString), 'MMM yyyy')

export const isInRange = (dateString, from, to) => {
  if (!from && !to) return true
  const date = parseISO(dateString)

  if (from && to) {
    return isWithinInterval(date, {
      start: parseISO(from),
      end: parseISO(to),
    })
  }

  if (from) return date >= parseISO(from)
  return date <= parseISO(to)
}

export const groupByMonth = (transactions) => {
  return transactions.reduce((acc, tx) => {
    const key = format(parseISO(tx.date), 'yyyy-MM')
    if (!acc[key]) acc[key] = []
    acc[key].push(tx)
    return acc
  }, {})
}
