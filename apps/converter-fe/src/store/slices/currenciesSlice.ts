import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  all: Currency[]; // все валюты с бэкенда
  selected: string[]; // коды выбранных валют
  values: Record<string, string>; // значения в инпутах по коду валюты
  loading: boolean;
  error: string | null;
}

const initialState: CurrenciesState = {
  all: [],
  selected: ['USD', 'EUR', 'RUB', 'BYN'],
  values: { USD: '1', EUR: '', RUB: '', BYN: '' },
  loading: false,
  error: null,
};

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/currencies`
    );
    return res.data;
  }
);

export const convertCurrencies = createAsyncThunk(
  'currencies/convert',
  async ({
    code,
    value,
    selected,
  }: {
    code: string;
    value: string;
    selected: string[];
  }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/convert`, {
      code,
      value,
      selected,
    });
    return res.data; // { [code]: value, ... }
  }
);

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<string[]>) {
      state.selected = action.payload;
    },
    setValue(state, action: PayloadAction<{ code: string; value: string }>) {
      state.values[action.payload.code] = action.payload.value;
    },
    resetValues(state) {
      state.values = { USD: '1', EUR: '', RUB: '', BYN: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrencies.fulfilled,
        (state, action: PayloadAction<Currency[]>) => {
          state.loading = false;
          state.all = action.payload;
        }
      )
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки валют';
      })
      .addCase(
        convertCurrencies.fulfilled,
        (state, action: PayloadAction<Record<string, string>>) => {
          state.values = action.payload;
        }
      );
  },
});

export const { setSelected, setValue, resetValues } = currenciesSlice.actions;

export default currenciesSlice.reducer;
