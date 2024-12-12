import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';

interface PreferencesState {
  theme: 'light' | 'dark';
  language: 'en' | 'ar' | string;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
}

const getInitialState = (): PreferencesState => {
  const theme = 'light';
  const language = 'en';
  const direction = 'ltr';
  const isRTL = false;
  return { theme, language, direction, isRTL };
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: getInitialState(),
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      const theme = action.payload === 'dark' ? 'light' : 'dark';
      state.theme = theme;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      const language = action.payload === 'en' ? 'ar' : 'en';
      i18next.changeLanguage(language);
      console.log(`language changed ${language}`);
      state.language = language;
    },
    setDirection: (state, action: PayloadAction<'ltr' | 'rtl'>) => {
      state.direction = action.payload;
      state.isRTL = action.payload === 'rtl';
    },
  },
});

export const { setTheme, setLanguage, setDirection } = preferencesSlice.actions;
export default preferencesSlice.reducer;
