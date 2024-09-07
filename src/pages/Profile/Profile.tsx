import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAccounts } from "../../store/features/profileSlice";
import { useSelector } from "react-redux";
import {
  selectSubAccountsWithEquity,
  totalTradingRewards,
} from "../../store/selectors/accountsSelector";

import React from "react";
import { Button } from "primereact/button";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeSubaccounts = useSelector(selectSubAccountsWithEquity);
  const totalRewards = useSelector(totalTradingRewards);
  const { error, loading } = useAppSelector((state) => state.profile);
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);
  if (loading === "pending") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <Button label="Check" icon="pi pi-check" />
      {/* <h2>Account: {activeSubaccounts[0].address}</h2>
      <h2>Rewards: {totalRewards}</h2> */}
    </div>
  );
};

export default Profile;
