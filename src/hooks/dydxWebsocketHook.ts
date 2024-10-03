import { useEffect, useCallback, useRef, useState } from 'react';
import { Network } from '@dydxprotocol/v4-client-js';
import {
  CandlesResolution,
  IncomingMessageTypes,
  SocketClient,
} from '@dydxprotocol/v4-client-js/build/src/clients/socket-client';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const useDydxV4WebSocket = (ticker: string, resolution: CandlesResolution = CandlesResolution.FIFTEEN_MINUTES) => {
  const [lastCandle, setLastCandle] = useState<CandleData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const socketRef = useRef<SocketClient | null>(null);

  const handleMessage = useCallback((message: MessageEvent) => {
    if (typeof message.data === 'string') {
      try {
        const data = JSON.parse(message.data);
        if (data.type === IncomingMessageTypes.CONNECTED) {
          if (socketRef.current) {
            socketRef.current.subscribeToCandles(ticker, resolution);
          }
        } else if (data.type === 'channel_data' && data.contents && data.channel === 'v4_candles') {
          const candleData = data.contents;
          setLastCandle({
            time: new Date(candleData.startedAt).toISOString(),
            open: parseFloat(candleData.open),
            high: parseFloat(candleData.high),
            low: parseFloat(candleData.low),
            close: parseFloat(candleData.close),
          });
        }
        console.log(data);
      } catch (e) {
        console.error('Error parsing JSON message:', e);
      }
    }
  }, [ticker, resolution]);

  useEffect(() => {
    const mySocket = new SocketClient(
      Network.testnet().indexerConfig,
      () => {
        console.log('Socket opened');
        setConnectionStatus('connected');
      },
      () => {
        console.log('Socket closed');
        setConnectionStatus('disconnected');
      },
      handleMessage,
      (error) => {
        console.error('Encountered error:', error);
        setConnectionStatus('error');
      }
    );

    socketRef.current = mySocket;
    mySocket.connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [handleMessage]);

  return { lastCandle, connectionStatus };
};

export default useDydxV4WebSocket;