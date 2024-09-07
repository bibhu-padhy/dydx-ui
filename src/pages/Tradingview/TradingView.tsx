import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMarkets } from "../../store/features/marketsSlice";
import { fetchAccounts } from "../../store/features/profileSlice";

const TradingView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: markets,
    loading,
    error,
  } = useAppSelector((state) => state.markets);

  useEffect(() => {
    dispatch(fetchMarkets());
  }, [dispatch]);

  if (loading === "pending") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Markets</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={tableHeaderStyle}>Ticker</th>
            <th style={tableHeaderStyle}>Oracle Price</th>
            <th style={tableHeaderStyle}>24h Change</th>
            <th style={tableHeaderStyle}>24h Volume</th>
            <th style={tableHeaderStyle}>Open Interest</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(markets).map(([id, market]: [string, any]) => (
            <tr key={id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tableCellStyle}>{market.ticker}</td>
              <td style={tableCellStyle}>
                ${parseFloat(market.oraclePrice).toFixed(2)}
              </td>
              <td style={tableCellStyle}>
                <span
                  style={{
                    color:
                      parseFloat(market.priceChange24H) >= 0 ? "green" : "red",
                  }}
                >
                  {parseFloat(market.priceChange24H).toFixed(2)}
                </span>
              </td>
              <td style={tableCellStyle}>
                ${parseFloat(market.volume24H).toLocaleString()}
              </td>
              <td style={tableCellStyle}>
                {parseFloat(market.openInterest).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
};

const tableCellStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
};

export default TradingView;
