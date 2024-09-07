// src/api/dydxClient.ts
import {
    IndexerClient,
    Network,
} from '@dydxprotocol/v4-client-js';

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
}

export const dydxApi = new DydxApiClient();