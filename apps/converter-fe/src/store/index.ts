import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './slices/currenciesSlice';
import uiReducer from './slices/uiSlice';
import historyReducer from './slices/historySlice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    ui: uiReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
