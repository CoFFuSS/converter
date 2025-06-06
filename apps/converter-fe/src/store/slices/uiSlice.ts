import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface UIState {
  theme: Theme;
  activeTab: 'converter' | 'rates';
}

const initialState: UIState = {
  theme: 'light',
  activeTab: 'converter',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setActiveTab(state, action: PayloadAction<'converter' | 'rates'>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setTheme, setActiveTab } = uiSlice.actions;
export default uiSlice.reducer; 