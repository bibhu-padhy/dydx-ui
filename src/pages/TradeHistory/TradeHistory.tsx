import { useEffect } from "react";
import { useAppDispatch, useAppSelector, AppRootState } from "../../store";
import { selectTradeHistory } from "../../store/selectors/tradeHistorySelector";
import { fetchSubaccountHistoricalPNLs } from "../../store/features/tradeHistorySlice";

export default function TradeHistory() {
  const dispatch = useAppDispatch();
  //   const TradeHistory = useAppSelector(selectTradeHistory);

  useEffect(() => {
    dispatch(fetchSubaccountHistoricalPNLs());
  }, [dispatch]);
  return <div>Trade History </div>;
}
