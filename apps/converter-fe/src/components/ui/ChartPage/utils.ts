import { CandlestickData } from '@/types/timelinePage';

export const labelProperties = [
  { text: 'Select Date:', id: 'selectedDate', type: 'date' },
  { text: 'Minimum Price:', id: 'minPrice', type: 'number' },
  { text: 'Maximum Price:', id: 'maxPrice', type: 'number' },
] as const;

export const getRandomDataWithArguments = (min: number, max: number) =>
  Number(Math.random() * (max - min + 1) + min);

const dayMilliseconds = 24 * 60 * 60 * 1000;

export const generateRandomCurrencyDataArray = (
  min: number,
  max: number,
  selectedDate: string
): CandlestickData[] => {
  const startDate = new Date(selectedDate).getTime();
  const currencyDataArray: CandlestickData[] = [];

  for (let i = 0; i < 30; i += 1) {
    const randomDayOffset = i * dayMilliseconds;
    const o = getRandomDataWithArguments(min, max);
    const c = getRandomDataWithArguments(min, max);
    const h = getRandomDataWithArguments(Math.max(o, c), max);
    const l = getRandomDataWithArguments(min, Math.min(c, o));

    const randomTimestamp = startDate + randomDayOffset;

    currencyDataArray.push({
      x: randomTimestamp,
      o,
      h,
      l,
      c,
    });
  }

  return currencyDataArray;
};

export const isValidNumberInput = (value: string): boolean =>
  /^\d*\.?\d*$/.test(value);

export const getChartDataset = (dataset: CandlestickData[]) => ({
  labels: [],
  datasets: [
    {
      data: dataset,
      label: 'Candlestick Data',
      backgroundColor: '#000000',
      color: {
        up: 'rgba(80, 160, 115, 1)',
        down: 'rgba(215, 85, 65, 1)',
        unchanged: 'rgba(90, 90, 90, 1)',
      },
      pointRadius: 0,
      pointHoverRadius: 0,
    },
  ],
});

export const getChartOptions = (min: number, max: number) => ({
  responsive: true,
  scales: {
    y: { beginAtZero: false, min, max },
  },
  plugins: {
    title: {
      display: true,
      text: 'Candlestick Chart',
    },
    legend: {
      display: false,
    },
  },
});
