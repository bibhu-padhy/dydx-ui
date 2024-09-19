import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadingState } from "../../types";
import { dydxApi } from "../../api/dydxClient";

interface TradeHistoryState {
    history: any | null,
    loading: loadingState,
    error: string | null
}


const initialState: TradeHistoryState = {
    history: null,
    loading: "idle",
    error: null
}

export const fetchSubaccountHistoricalPNLs = createAsyncThunk<any>(
    'tradeHistory/fetchSubaccountHistoricalPNLs',
    async () => {
        const response = await dydxApi.getSubaccountFills();
        console.log(response);
        return response
    }
)

const tradeHistorySlice = createSlice({
    name: "tradeHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubaccountHistoricalPNLs.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchSubaccountHistoricalPNLs.fulfilled, (state, action) => {
                state.loading = "succeeded"
                state.history = action.payload
            })
            .addCase(fetchSubaccountHistoricalPNLs.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message || "An error occurred"
            })
    }
})

export default tradeHistorySlice.reducer