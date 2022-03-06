import hash from 'object-hash'
import {Transaction, TransactionFilters} from './types'

export const getTransactionURLParams = (params: TransactionFilters) => {
    const userParams = new URLSearchParams()
    const {type, fromDate, toDate} = params

    if (type) userParams.append('transactionType', type)
    if (fromDate) userParams.append('fromDate', fromDate)
    if (toDate) userParams.append('toDate', toDate)

    return userParams.toString()
}

export const getTransactionHash = (transaction: Transaction) =>
    hash({
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.transactionDate,
    })
