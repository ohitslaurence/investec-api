import hash from 'object-hash'
import {Transaction, TransactionType} from './apiTypes'
import {TransactionFilters} from './types'

const validateTransactionFilters = (params: TransactionFilters) => {
    if (params.type) {
        const transactionTypes = Object.values(TransactionType)
        if (!transactionTypes.includes(params.type)) throw new Error(`${params.type} is not a valid transaction type`)
    }
}

export const getTransactionURLParams = (params: TransactionFilters) => {
    validateTransactionFilters(params)
    const userParams = new URLSearchParams()
    const {type} = params

    if (type) userParams.append('transactionType', type)
    // if (fromDate) userParams.append('fromDate', fromDate)
    // if (toDate) userParams.append('toDate', toDate)

    return userParams.toString()
}

export const validateStatusCode = (statusCode: number) => {
    switch (statusCode) {
        case 400:
            throw new Error('400 Bad Request: The requested operation will not be carried out')
        case 401:
            throw new Error('401 Unauthorized: The requested operation was refused access')
        case 500:
            throw new Error('500 Internal Server Error: The requested operation failed to execute')
    }
}

export const getTransactionHash = (transaction: Transaction) =>
    hash({
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.transactionDate,
    })
