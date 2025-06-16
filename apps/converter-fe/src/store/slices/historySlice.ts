import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Transaction } from '@/types/transaction';

interface HistoryState {
  transactions: Transaction[];
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  transactions: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  loading: false,
  error: null,
};

interface HistoryResponse {
  data: Transaction[];
  page: number;
  limit: number;
  totalCount: number;
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
      fetchHistory({ page: state.page, limit: state.limit });
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
          state.totalPages =
            action.payload.totalCount > 0
              ? Math.ceil(action.payload.totalCount / state.limit)
              : 1;
          console.log(action.payload.totalCount, state.limit);
          console.log(state.totalPages);
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
