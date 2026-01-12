import  {configureStore} from "@reduxjs/toolkit"
import ServiceReducer from "./slice/ServiceSlice"
import TransactionReducer from './slice/TransactionSlice'

export const store = configureStore({
    reducer:{
        service:ServiceReducer,
        transactionHistory:TransactionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;