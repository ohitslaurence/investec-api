export type Account = {
    accountId: string
    accountNumber: string
    accountName: string
    referenceName: string
    productName: string
}

export type Balance = {
    accountId: string
    currentBalance: number
    availableBalance: number
    currency: string
}

export enum TransactionType {
    Deposits = 'Deposits',
    CardPurchases = 'CardPurchases',
    OnlineBankingPayments = 'OnlineBankingPayments',
    FeesAndInterest = 'FeesAndInterest',
    ATMWithdrawals = 'ATMWithdrawals',
    VASTransactions = 'VASTransactions',
    FasterPay = 'FasterPay',
}

export type Transaction = {
    accountId: string
    type: 'CREDIT' | 'DEBIT'
    transactionType: TransactionType
    status: string
    description: string
    cardNumber: string
    postedOrder: number
    postingDate: string
    valueDate: string
    actionDate: string
    transactionDate: string
    amount: number
    runningBalance: number
}

export type DateRangeFilter = {fromDate?: Date | string; toDate?: Date | string}

export type TransactionFilters = {
    type?: TransactionType
} & DateRangeFilter
