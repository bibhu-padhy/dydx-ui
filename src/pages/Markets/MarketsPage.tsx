import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMarkets } from "../../store/features/marketsSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

const Markets: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: markets,
    loading,
    error,
  } = useAppSelector((state) => state.markets);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  useEffect(() => {
    dispatch(fetchMarkets());
  }, [dispatch]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const priceChangeBodyTemplate = (rowData: any) => {
    const change = parseFloat(rowData.priceChange24H);
    return (
      <span style={{ color: change >= 0 ? 'green' : 'red' }}>
        {change.toFixed(2)}%
      </span>
    );
  };

  const onPage = (event:any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const marketsArray = Object.values(markets);

  if (loading === "pending") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card title="Markets" >
      <DataTable 
        value={marketsArray}
        paginator
        rows={rows}
        totalRecords={marketsArray.length}
        first={first}
        onPage={onPage}
      >
        <Column field="ticker" header="Ticker" sortable></Column>
        <Column 
          field="oraclePrice" 
          header="Oracle Price" 
          sortable 
          body={(rowData) => formatCurrency(parseFloat(rowData.oraclePrice))}
        ></Column>
        <Column 
          field="priceChange24H" 
          header="24h Change" 
          sortable
          body={priceChangeBodyTemplate}
        ></Column>
        {/* <Column 
          field="volume24H" 
          header="24h Volume" 
          sortable
          body={(rowData) => formatCurrency(parseFloat(rowData.volume24H))}
        ></Column> */}
        <Column 
          field="openInterest" 
          header="Open Interest" 
          sortable
          body={(rowData) => parseFloat(rowData.openInterest).toLocaleString()}
        ></Column>
      </DataTable>
    </Card>
  );
};

export default Markets;