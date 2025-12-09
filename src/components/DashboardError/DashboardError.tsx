import { Header } from '../Header';
import { ErrorIcon } from '../ui/Icons';

interface DashboardErrorProps {
  error: string;
  onRetry: () => void;
}

export const DashboardError = ({ error, onRetry }: DashboardErrorProps) => {
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Header />
        <div className="dashboard__error">
          <ErrorIcon />
          <h2>Ошибка загрузки</h2>
          <p>{error}</p>
          <button onClick={onRetry} className="retry-btn">
            Попробовать снова
          </button>
        </div>
      </div>
    </div>
  );
};
