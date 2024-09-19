import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { SelectButton } from "primereact/selectbutton";

import { Button } from "primereact/button";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

interface Market {
  id: string;
  name: string;
}

export default function PlaceOrder() {
  const { entities: marketsObj, loading } = useAppSelector(
    (state) => state.markets
  );
  const sideOptions = ["LONG", "SHORT"];
  const [side, setSide] = useState(sideOptions[0]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([]);
  const [amount, setAmount] = useState<number | null>(null);
  useEffect(() => {
    // Transform markets object to array when it changes
    const marketsArray = Object.entries(marketsObj).map(([id, market]) => ({
      id,
      name: market.ticker,
      ticker: market.ticker,
    }));
    setMarkets(marketsArray);
  }, [marketsObj]);

  const searchMarkets = (event: AutoCompleteCompleteEvent) => {
    let filtered: Market[];
    if (!event.query.trim().length) {
      filtered = [...markets];
    } else {
      filtered = markets.filter((market) =>
        market.name.toLowerCase().includes(event.query.toLowerCase())
      );
    }
    setFilteredMarkets(filtered);
  };

  const handleAmountChange = (e: InputNumberValueChangeEvent) => {
    if (!e.value) {
      return;
    }
    setAmount(e.value);
  };

  return (
    <div>
      <AutoComplete
        id="market"
        value={selectedMarket}
        suggestions={filteredMarkets}
        completeMethod={searchMarkets}
        field="name"
        onChange={(e) => setSelectedMarket(e.value)}
        disabled={loading === "pending"}
      />
      <SelectButton
        value={side}
        onChange={(e) => setSide(e.value)}
        options={sideOptions}
      />
      <InputNumber
        value={amount}
        onValueChange={handleAmountChange}
        mode="decimal"
        maxFractionDigits={6}
      />
      <Button label="Place order" />
    </div>
  );
}
