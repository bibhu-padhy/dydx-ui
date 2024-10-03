export interface Thought {
  topic: string;
  id?: string;
  type: 'pre-trade' | 'active-trade' | 'post-trade' | 'market-insight';
  content: string;
  assets: string[];
  tags: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
  importance: number;
  status: 'active' | 'archived' | 'deleted';
  priceLevels?: {
    current?: number;
    target?: number;
    stopLoss?: number;
  };
  tradeStatus?: 'potential' | 'active' | 'closed';
  riskAssessment?: string;
  timeframe?: string;
  confidenceLevel?: number;
  parentThoughtId?: string;
  relatedThoughtIds?: string[];
  externalReferences?: string[];
  createdAt: string;
}
