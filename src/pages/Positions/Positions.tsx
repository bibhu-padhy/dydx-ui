import { useSelector } from "react-redux";
import {
  selectAllOpenPositions,
  totalPnlSelector,
} from "../../store/selectors/accountsSelector";
import { useEffect } from "react";
import { fetchAccounts } from "../../store/features/profileSlice";
import { useAppDispatch } from "../../store";
import { Card } from "primereact/card";
import { formatNum } from "../../utils";

export default function Positions() {
  const dispatch = useAppDispatch();
  const activeSubaccounts = useSelector(selectAllOpenPositions);
  const totalPnl = useSelector(totalPnlSelector);
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const header = (market: string) => {
    return <>{market}</>;
  };

  return (
    <div>
      <div>Total PNL: ${formatNum(totalPnl)}</div>
      {activeSubaccounts.map((account) => (
        <Card key={account.market} header={header(account.market)}>
          <div className="grid">
            <div className="col">Size: {account.size}</div>
            <div className="col">Pnl: ${formatNum(account.unrealizedPnl)}</div>
          </div>
          <div className="grid">
            <div className="col">Side: {account.side}</div>
            <div className="col">Entry: {formatNum(account.entryPrice)}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
