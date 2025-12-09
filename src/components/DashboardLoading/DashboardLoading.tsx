import { Header } from '../Header';
import { Spinner } from '../ui/Spinner';

export const DashboardLoading = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Header />
        <div className="dashboard__loading">
          <Spinner size="large" />
          <p>Загрузка данных...</p>
        </div>
      </div>
    </div>
  );
};
