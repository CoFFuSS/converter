import { CACHE_KEY, CACHE_EXPIRY, initialState } from '@/constants';
import { CurrenciesState, Currency } from '@/types';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  async (_, { getState }) => {
    const state = getState() as { currencies: CurrenciesState };
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/currencies`
    );
    const data = response.data;
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
    return data;
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
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/currencies/convert`,
      {
        code,
        value,
        selected,
      }
    );
    return res.data;
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
    addCurrency: (state, action) => {
      if (!state.selected.includes(action.payload)) {
        state.selected.push(action.payload);
      }
    },
    removeCurrency: (state, action) => {
      state.selected = state.selected.filter((code) => code !== action.payload);
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

export const {
  setSelected,
  setValue,
  resetValues,
  addCurrency,
  removeCurrency,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
