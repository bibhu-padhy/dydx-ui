import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { dydxApi } from "../../api/dydxClient"
import { loadingState } from "../../types"
import { AccountsResponse } from "../../types/accountTypes"

interface AccountState {
    accounts: AccountsResponse | null,
    loading: loadingState,
    error: string | null
}

const initialState: AccountState = {
    accounts: null,
    loading: "idle",
    error: null
}

export const fetchAccounts = createAsyncThunk<AccountsResponse>(
    'accounts/fetchAccounts',
    async () => {
        const response = await dydxApi.getAccounts();
        console.log(response);

        return response
    }
)

const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAccounts.pending, (state) => {
            state.loading = "pending"
        })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.accounts = action.payload
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.loading = "failed",
                    state.error = action.error.message || "An error occurred"
            })
    }
})

export default accountsSlice.reducer