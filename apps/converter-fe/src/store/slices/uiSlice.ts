import { initialUIState, THEME_KEY, LANGUAGE_KEY } from '@/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem(THEME_KEY, action.payload);
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem(LANGUAGE_KEY, action.payload);
    },
    setActiveTab(
      state,
      action: PayloadAction<'converter' | 'rates' | 'history' | 'chart'>
    ) {
      state.activeTab = action.payload;
    },
  },
});

export const { setTheme, setLanguage, setActiveTab } = uiSlice.actions;
export default uiSlice.reducer;
