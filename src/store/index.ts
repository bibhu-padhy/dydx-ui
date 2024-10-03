// configure store
// export store
// export root state
// export app dispatch 

import { configureStore } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import marketsSlice from "./features/marketsSlice"
import accountsReducer from "./features/profileSlice"
import tradeHistoryReducer from "./features/tradeHistorySlice"
import thoughtsReducer from "./features/thoughtsSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { db } from "../firebase.config"

export const store = configureStore({
    reducer: {
        markets: marketsSlice,
        profile: accountsReducer,
        tradeHistory: tradeHistoryReducer,
        thoughts: thoughtsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { db },
            },
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;