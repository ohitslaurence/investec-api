import {TransactionFilters, TransactionType} from './types'

const throwInvalidDate = (date: any) => {
    throw new Error(`${date} is not a valid ISO date format`)
}

const validateDate = (date: string | Date) => {
    if (date instanceof Date) return

    if (typeof date === 'string') {
        const valid = /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/.test(date)
        if (!valid) throwInvalidDate(date)
        return
    }

    throwInvalidDate(date)
}

export const validateTransactionFilters = (params: TransactionFilters) => {
    if (params.type) {
        if (!Object.values(TransactionType).includes(params.type))
            throw new Error(`${params.type} is not a valid transaction type`)
    }
    if (params.fromDate) validateDate(params.fromDate)
    if (params.toDate) validateDate(params.toDate)
}

export const validateStatusCode = (statusCode: number) => {
    switch (statusCode) {
        case 400:
            throw new Error('400 Bad Request: The requested operation will not be carried out')
        case 401:
            throw new Error('401 Unauthorized: The requested operation was refused access')
        case 500:
            throw new Error('500 Internal Server Error: The requested operation failed to execute')
        default:
            break
    }
}
