import { UIState } from '@/types';

export const THEME_KEY = 'theme';
export const LANGUAGE_KEY = 'language';

export const initialUIState: UIState = {
  theme: 'light',
  language: 'en',
  activeTab: 'converter',
};
