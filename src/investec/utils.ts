import formatISO from 'date-fns/formatISO'
import hash from 'object-hash'
import {Transaction, TransactionFilters} from './types'
import {validateTransactionFilters} from './validation'

export const formatDate = (date: Date | string) => {
    if (date instanceof Date) return formatISO(date, {representation: 'date'})
    return date
}

export const getTransactionURLParams = (params: TransactionFilters) => {
    validateTransactionFilters(params)
    const userParams = new URLSearchParams()
    const {type, fromDate, toDate} = params

    if (type) userParams.append('transactionType', type)
    if (fromDate) userParams.append('fromDate', formatDate(fromDate))
    if (toDate) userParams.append('toDate', formatDate(toDate))

    return userParams.toString()
}

export const getTransactionHash = (transaction: Transaction) =>
    hash({
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.transactionDate,
    })
