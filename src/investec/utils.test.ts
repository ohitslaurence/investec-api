import {TransactionType} from './apiTypes'
import {getTransactionURLParams} from './utils'

describe('getTransactionURLParams', () => {
    it('correctly formats a valid transaction type', () => {
        const type = TransactionType.Deposits
        const queryString = getTransactionURLParams({type})

        expect(queryString).toEqual(`transactionType=${TransactionType.Deposits}`)
    })

    it('throws an error if given an incorrect transaction type', () => {
        const type = 'Invalid'

        expect(() => {
            // @ts-ignore
            getTransactionURLParams({type})
        }).toThrow('Invalid is not a valid transaction type')
    })
})
