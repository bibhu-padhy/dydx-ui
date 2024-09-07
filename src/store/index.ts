// configure store
// export store
// export root state
// export app dispatch 

import { configureStore } from "@reduxjs/toolkit"
import marketsSlice from "./features/marketsSlice"


export const store = configureStore({
    reducer: {
        markets: marketsSlice
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch