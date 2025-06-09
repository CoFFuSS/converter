import { CurrenciesState } from '@/types';

export const CACHE_KEY = 'currencies_cache';
export const CACHE_EXPIRY = 2 * 60 * 60 * 1000;

export const initialState: CurrenciesState = {
  all: [],
  selected: ['USD', 'EUR', 'RUB', 'BYN'],
  values: { USD: '1', EUR: '', RUB: '', BYN: '' },
  loading: false,
  error: null,
};
