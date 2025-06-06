import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './slices/currenciesSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 