import { createSelector } from "@reduxjs/toolkit"
import { AppRootState } from ".."


export const selectAccounts = (state: AppRootState) => state.profile.accounts

export const selectSubAccountsWithEquity = createSelector([selectAccounts],
    (accounts) => {
        return accounts?.subaccounts.filter(subaccount => parseFloat(subaccount.equity) > 0) || []
    })

export const totalTradingRewards = createSelector([selectAccounts],
    (accounts => accounts?.totalTradingRewards)
)