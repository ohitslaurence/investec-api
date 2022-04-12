import {request as httpRequest} from 'undici'
import {HttpMethod} from 'undici/types/dispatcher'
import {
    Account,
    Balance,
    DateRangeFilter,
    Transaction,
    TransactionFilters,
    TransactionType,
    TransferList,
    TransferResponse,
} from './types'
import {getTransactionURLParams} from './utils'
import {validateStatusCode} from './validation'

export const INVESTEC_API_URL = process.env.INVESTEC_API_URL || 'https://openapi.investec.com/za/pb/v1'
const INVESTEC_API_KEY = process.env.INVESTEC_API_KEY || ''

export class InvestecClient {
    private apiUrl = INVESTEC_API_URL
    protected accessToken: Promise<string> | undefined = undefined
    protected clientId: string
    protected clientSecret: string

    constructor(config?: {clientId: string; clientSecret: string}) {
        this.clientId = config?.clientId || process.env.INVESTEC_CLIENT_ID || ''
        this.clientSecret = config?.clientSecret || process.env.INVESTEC_CLIENT_SECRET || ''
    }

    public async getAccounts() {
        const {accounts} = await this.request<{accounts: Account[]}>('/accounts')
        return accounts
    }

    public async getBalance(accountId: string) {
        const balance = await this.request<Balance>(`/accounts/${accountId}/balance`)
        return balance
    }

    public async getDeposits(accountId: string, params: DateRangeFilter = {}) {
        return this.getTransactions(accountId, {
            type: TransactionType.Deposits,
            ...params,
        })
    }

    public async getTransactions(accountId: string, query: TransactionFilters = {}) {
        const queryParams = getTransactionURLParams(query)

        const {transactions} = await this.request<{
            transactions: Transaction[]
        }>(`/accounts/${accountId}/transactions?${queryParams}`)

        return transactions
    }

    public async transfer(from: string, transferList: TransferList[]) {
        const {transferResponse} = await this.request<{
            transferResponse: TransferResponse
        }>(`/accounts/transfermultiple`, 'POST', {
            AccountId: from,
            TransferList: transferList,
        })

        return transferResponse.TransferResponses
    }

    private async request<Response>(
        endpoint: string,
        method: HttpMethod = 'GET',
        requestBody: Record<string, any> | null = null,
    ) {
        const url = `${this.apiUrl}${endpoint}`
        const accessToken = await this.getAccessToken()
        const parsedBody = JSON.stringify(requestBody)

        try {
            const {body, statusCode} = await httpRequest(url, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                method,
                body: parsedBody,
            })

            validateStatusCode(statusCode)

            const {data} = await body.json()
            return data as Response
        } catch (error) {
            throw error
        }
    }

    private async requestAccessToken() {
        if (!(this.clientId.length && this.clientSecret.length))
            throw new Error('Missing Investec API client credentials')

        const url = process.env.INVESTEC_TOKEN_URL || 'https://openapi.investec.com/identity/v2/oauth2/token'

        const authHeader = 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')

        const {body, statusCode} = await httpRequest(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: authHeader,
                'x-api-key': INVESTEC_API_KEY,
            },
            method: 'POST',
            body: 'grant_type=client_credentials',
        })

        validateStatusCode(statusCode)

        const data = await body.json()
        return data.access_token as string
    }

    private async getAccessToken() {
        if (!this.accessToken) return this.requestAndSetAccessToken()
        return this.accessToken
    }

    private requestAndSetAccessToken() {
        const accessTokenPromise = this.requestAccessToken()

        this.accessToken = accessTokenPromise
        return this.accessToken
    }
}
