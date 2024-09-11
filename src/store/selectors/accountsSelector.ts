import { createSelector } from "@reduxjs/toolkit"
import { AppRootState } from ".."
import { Subaccount } from "../../types/accountTypes"



export const selectAccounts = (state: AppRootState) => state.profile.accounts

export const selectSubAccountsWithEquity = createSelector([selectAccounts],
    (accounts) => {
        return accounts?.subaccounts.filter(subaccount => parseFloat(subaccount.equity) > 0) || []
    })

export const selectAllOpenPositions = createSelector(
    [selectSubAccountsWithEquity],
    (subaccounts) => subaccounts.flatMap((subaccount: Subaccount) =>
        Object.entries(subaccount.openPerpetualPositions).map(([market, position]) => ({
            ...position,
            market,
            subaccountNumber: subaccount.subaccountNumber
        }))
    )
);

export const totalPnlSelector = createSelector(
    [selectAllOpenPositions],
    (positions) => positions.reduce((acc, cur) => {
        const pnl = parseFloat(cur.unrealizedPnl)
        return !isNaN(pnl) ? acc + pnl : acc
    }, 0)
)

export const totalTradingRewards = createSelector([selectAccounts],
    (accounts => accounts?.totalTradingRewards)
)
