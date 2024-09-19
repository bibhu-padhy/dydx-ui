// src/api/dydxClient.ts
import {
    IndexerClient,
    Network,
} from '@dydxprotocol/v4-client-js';
import { AccountsResponse } from '../types/accountTypes';

class DydxApiClient {
    private indexerClient: IndexerClient;

    constructor() {
        this.indexerClient = new IndexerClient(Network.mainnet().indexerConfig);
    }

    async getMarkets() {
        try {
            const markets = await this.indexerClient.markets.getPerpetualMarkets();
            return markets.markets;
        } catch (error) {
            console.error('Error fetching markets:', error);
            throw error;
        }
    }

    async getAccounts(): Promise<AccountsResponse> {
        try {
            const accounts = await this.indexerClient.account.getSubaccounts("dydx1r22frjep9wqf2ytu6yzr4lxefctsk682g5xscc")
            return accounts
        } catch (error) {
            console.error('Error fetching accounts:', error);
            throw error;
        }
    }

    async getSubaccountHistoricalPNLs(): Promise<any> {
        return await this.indexerClient.account.getSubaccountHistoricalPNLs("dydx1r22frjep9wqf2ytu6yzr4lxefctsk682g5xscc", 0,)
    }

    async getSubaccountFills(): Promise<any> {
        return await this.indexerClient.account.getSubaccountFills("dydx1r22frjep9wqf2ytu6yzr4lxefctsk682g5xscc", 0,)
    }
}



export const dydxApi = new DydxApiClient();