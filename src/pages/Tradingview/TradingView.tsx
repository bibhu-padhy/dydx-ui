import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMarkets } from "../../store/features/marketsSlice";

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

  return <div>Trading view chart</div>;
};

export default TradingView;
