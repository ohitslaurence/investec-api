import {TransactionType} from './types'
import {getTransactionURLParams} from './utils'

describe('getTransactionURLParams', () => {
    it('correctly formats a valid transaction type', () => {
        const type = TransactionType.Deposits
        const queryString = getTransactionURLParams({type})

        expect(queryString).toEqual(`transactionType=${TransactionType.Deposits}`)
    })

    it('throws an error if given an incorrect transaction type', () => {
        expect(() => {
            // @ts-ignore
            getTransactionURLParams({type: 'Invalid'})
        }).toThrow('Invalid is not a valid transaction type')
    })

    it('correctly formats transaction date range given date object', () => {
        const fromDate = new Date('2022-12-13')
        const toDate = new Date('2022-12-14')
        const queryString = getTransactionURLParams({fromDate, toDate})

        expect(queryString).toEqual('fromDate=2022-12-13&toDate=2022-12-14')
    })

    it('correctly formats transaction date range given string date', () => {
        const fromDate = '2022-12-13'
        const toDate = '2022-12-14'
        const queryString = getTransactionURLParams({fromDate, toDate})

        expect(queryString).toEqual('fromDate=2022-12-13&toDate=2022-12-14')
    })

    it('throws an error if given an incorrect date format', () => {
        expect(() => {
            // @ts-ignore
            getTransactionURLParams({fromDate: '12-03-2022'})
        }).toThrow('12-03-2022 is not a valid ISO date format')
    })
})
