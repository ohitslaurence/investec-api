import {TransactionType} from './apiTypes'

export type TransactionFilters = {
    type?: TransactionType
    fromDate?: Date | string
    toDate?: Date | string
}

export type DateRangeFilter = Omit<TransactionFilters, 'type'>
