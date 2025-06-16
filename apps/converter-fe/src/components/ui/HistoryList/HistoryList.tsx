import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory, setPage, setLimit } from '@/store/slices/historySlice';
import styles from './HistoryList.module.css';
import { useTranslation } from 'react-i18next';
import { Transaction, TargetCurrency } from '@/types/transaction';
import { AppDispatch, RootState } from '@/store';

export const HistoryList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    transactions,
    page,
    limit,
    totalPages,
    loading,
    error,
  } = useSelector((state: RootState) => state.history);

  useEffect(() => {
    dispatch(fetchHistory({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(event.target.value)));
  };

  if (loading) {
    return <div className={styles.loading}>{t('loading')}</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{t('history.title')}</h2>
        <div className={styles.paginationControls}>
          <select
            value={limit}
            onChange={handleLimitChange}
            className={styles.limitSelect}
          >
            <option value={10}>10 {t('history.perPage')}</option>
            <option value={20}>20 {t('history.perPage')}</option>
            <option value={50}>50 {t('history.perPage')}</option>
          </select>
          <div className={styles.pageInfo}>
            {t('history.page')} {page} {t('history.of')} {totalPages}
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('history.date')}</th>
              <th>{t('history.baseCurrency')}</th>
              <th>{t('history.baseValue')}</th>
              <th>{t('history.targetCurrencies')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: Transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleString()}</td>
                <td>{transaction.baseCurrency}</td>
                <td>{transaction.baseValue}</td>
                <td>
                  {transaction.targetCurrencies.map((tc: TargetCurrency) => (
                    <div key={tc.code}>
                      {tc.code}: {tc.value}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          {t('history.previous')}
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={styles.paginationButton}
        >
          {t('history.next')}
        </button>
      </div>
    </div>
  );
}; 