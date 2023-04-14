import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import masterReducer from '../slices/masterSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        master: masterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})