import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './src/redux/rootReducer'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { orderApi } from './src/redux/rootServices'

export const store = configureStore({
    reducer: {
        ...rootReducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(orderApi.middleware)
})

setupListeners(store.dispatch)