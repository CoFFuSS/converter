'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from 'chartjs-chart-financial';
import 'chartjs-adapter-moment';

import {
  generateRandomCurrencyDataArray,
  getChartDataset,
  getChartOptions,
  isValidNumberInput,
  labelProperties,
} from './utils';
import styles from './ChartPage.module.css';
import { CandlestickData } from '@/types/timelinePage';

ChartJS.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController);

export const ChartPage = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [minPriceError, setMinPriceError] = useState('');
  const [maxPriceError, setMaxPriceError] = useState('');

  const validateInputs = () => {
    let minError = '';
    let maxError = '';

    if (!isValidNumberInput(String(minPrice))) {
      minError = 'Please enter a valid number';
    }

    if (!isValidNumberInput(String(maxPrice))) {
      maxError = 'Please enter a valid number';
    }

    if (minPrice > maxPrice) {
      minError = 'Minimum price cannot be greater than maximum price';
    }

    setMinPriceError(minError);
    setMaxPriceError(maxError);

    return !minError && !maxError;
  };

  const updateChart = (data: CandlestickData[], min: number, max: number) => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx && chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    if (ctx) {
      chartInstance.current = new ChartJS(ctx, {
        type: 'candlestick',
        data: getChartDataset(data),
        options: getChartOptions(min, max),
      });
    }
  };

  useEffect(() => {
    const newDataset = generateRandomCurrencyDataArray(minPrice, maxPrice, selectedDate);
    updateChart(newDataset, minPrice, maxPrice);

    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      const newDataset = generateRandomCurrencyDataArray(minPrice, maxPrice, selectedDate);
      updateChart(newDataset, minPrice, maxPrice);
    }
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(Number(event.target.value));
  };

  const inputValues: Record<string, string | number> = {
    selectedDate: selectedDate ?? '',
    minPrice: minPrice,
    maxPrice: maxPrice,
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <div className={styles.controlBlock}>
        {labelProperties.map(({ text, id, type }) => (
          <label key={id} htmlFor={id} className={styles.inputLabel}>
            {text}
            <input
              id={id}
              type={type}
              value={inputValues[id]}
              onChange={id === 'selectedDate' 
                ? handleDateChange 
                : (e) => handleNumberChange(e, id === 'minPrice' ? setMinPrice : setMaxPrice)}
              className={styles.chartInput}
            />
          </label>
        ))}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
          {minPriceError && <p className={styles.errorMessage}>{minPriceError}</p>}
          {maxPriceError && <p className={styles.errorMessage}>{maxPriceError}</p>}
        </div>
      </div>

      <div className={styles.chartContainer}>
        <canvas ref={chartRef} />
      </div>
    </form>
  );
}; 