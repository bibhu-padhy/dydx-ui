import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "..";

export const selectMarkets = (state: AppRootState) => state.markets.entities;


// return all the markets key in the object as string array and filter out the ones that are not active
export const selectMarketsArray = createSelector([selectMarkets], (markets) => Object.keys(markets))


