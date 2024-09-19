import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "..";

const selectTradeHistoryState = (state: AppRootState) => state.tradeHistory.history

export const selectTradeHistory = createSelector([selectTradeHistoryState],
    (tradeHistory) => tradeHistory
)