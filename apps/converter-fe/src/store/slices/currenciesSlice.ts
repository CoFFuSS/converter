import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurrencyValue {
  code: string;
  value: string;
}

export interface Currency {
  id: number;
  code: string;
  nameRu: string;
  nameEn?: string;
  scale: number;
  rate: number;
}

export interface CurrenciesState {
  selected: string[]; // коды выбранных валют
  values: Record<string, string>; // значения в инпутах
  allRates: Currency[]; // кэш всех курсов
  lastRatesUpdate: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrenciesState = {
  selected: ['USD', 'EUR', 'RUB', 'BYN'],
  values: { USD: '1' },
  allRates: [],
  lastRatesUpdate: null,
  loading: false,
  error: null,
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setSelected(state: CurrenciesState, action: PayloadAction<string[]>) {
      state.selected = action.payload;
    },
    setValue(state: CurrenciesState, action: PayloadAction<{ code: string; value: string }>) {
      state.values[action.payload.code] = action.payload.value;
    },
    setAllRates(state: CurrenciesState, action: PayloadAction<Currency[]>) {
      state.allRates = action.payload;
      state.lastRatesUpdate = Date.now();
    },
    setLoading(state: CurrenciesState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state: CurrenciesState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetValues(state: CurrenciesState) {
      state.values = { USD: '1' };
    },
  },
});

export const {
  setSelected,
  setValue,
  setAllRates,
  setLoading,
  setError,
  resetValues,
} = currenciesSlice.actions;

export default currenciesSlice.reducer; 