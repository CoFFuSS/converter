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

const SESSION_KEY = 'currencies_session';

function saveSession(state: CurrenciesState & { lastChangedCode?: string }) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        selected: state.selected,
        values: state.values,
        lastChangedCode: state.lastChangedCode,
      })
    );
  }
}

function loadSession(): Partial<
  CurrenciesState & { lastChangedCode?: string }
> | null {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem(SESSION_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // ignore JSON parse errors
      }
    }
  }
  return null;
}

const initialStateWithHydrated = {
  ...initialState,
  hydrated: false as boolean,
  lastChangedCode: 'USD' as string,
  restored: false as boolean,
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: initialStateWithHydrated,
  reducers: {
    setSelected(state, action: PayloadAction<string[]>) {
      state.selected = action.payload;
      saveSession(state);
    },
    setValue(state, action: PayloadAction<{ code: string; value: string }>) {
      state.values[action.payload.code] = action.payload.value;
      state.lastChangedCode = action.payload.code;
      saveSession(state);
    },
    resetValues(state) {
      state.values = { USD: '1', EUR: '', RUB: '', BYN: '' };
      state.lastChangedCode = 'USD';
      saveSession(state);
    },
    addCurrency: (state, action) => {
      if (!state.selected.includes(action.payload)) {
        state.selected.push(action.payload);
        saveSession(state);
      }
    },
    removeCurrency: (state, action) => {
      state.selected = state.selected.filter((code) => code !== action.payload);
      saveSession(state);
    },
    hydrateFromSessionStorage(state) {
      const session = loadSession();
      if (session) {
        if (session.selected) state.selected = session.selected;
        if (session.values) state.values = session.values;
        if (session.lastChangedCode)
          state.lastChangedCode = session.lastChangedCode;
      }
      state.hydrated = true;
      state.restored = false;
    },
    setRestored(state, action: PayloadAction<boolean>) {
      state.restored = action.payload;
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
  hydrateFromSessionStorage,
  setRestored,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
