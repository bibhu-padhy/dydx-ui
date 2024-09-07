// configure store
// export store
// export root state
// export app dispatch 

import { configureStore } from "@reduxjs/toolkit"
import marketsSlice from "./features/marketsSlice"
import accountsReducer from "./features/profileSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"


export const store = configureStore({
    reducer: {
        markets: marketsSlice,
        profile: accountsReducer
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;