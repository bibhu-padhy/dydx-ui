// types/accountTypes.ts

export interface OpenPerpetualPosition {
    market: string;
    status: string;
    side: 'LONG' | 'SHORT';
    size: string;
    maxSize: string;
    entryPrice: string;
    exitPrice: string | null;
    realizedPnl: string;
    unrealizedPnl: string;
    createdAt: string;
    createdAtHeight: string;
    closedAt: string | null;
    sumOpen: string;
    sumClose: string;
    netFunding: string;
    subaccountNumber: number;
  }
  
  export interface AssetPosition {
    size: string;
    symbol: string;
    side: 'LONG' | 'SHORT';
    assetId: string;
    subaccountNumber: number;
  }
  
  export interface Subaccount {
    address: string;
    subaccountNumber: number;
    equity: string;
    freeCollateral: string;
    openPerpetualPositions: {
      [market: string]: OpenPerpetualPosition;
    };
    assetPositions: {
      [asset: string]: AssetPosition;
    };
    marginEnabled: boolean;
    updatedAtHeight: string;
    latestProcessedBlockHeight: string;
  }
  
  export interface AccountsResponse {
    subaccounts: Subaccount[];
    totalTradingRewards: string;
  }
  