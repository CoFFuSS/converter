import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Transaction } from '@/types/transaction';

interface HistoryState {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  transactions: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  loading: false,
  error: null,
};

interface HistoryResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  }
);

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.page = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHistory.fulfilled,
        (state, action: PayloadAction<HistoryResponse>) => {
          state.loading = false;
          state.transactions = action.payload.data;
          state.total = action.payload.total;
          state.totalPages =
            action.payload.totalPages > 0 ? action.payload.totalPages : 1;
        }
      )
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch history';
      });
  },
});

export const { setPage, setLimit } = historySlice.actions;

export default historySlice.reducer;
