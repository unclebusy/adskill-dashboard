import { useAppSelector } from '../../store/hooks';
import { MetricCard } from '../ui/MetricCard';
import { ExpenseIcon } from '../ui/Icons/ExpenseIcon';
import { ClickIcon } from '../ui/Icons/ClickIcon';
import { CpcIcon } from '../ui/Icons/CpcIcon';
import { CpaIcon } from '../ui/Icons/CpaIcon';
import './MetricsCards.css';

export const MetricsCards = () => {
  const metrics = useAppSelector((state) => state.metrics);

  const formatMoney = (value: number) => {
    return '$' + value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', ' ');
  };

  return (
    <div className="metrics-cards">
      <MetricCard
        title="Расходы"
        value={formatMoney(metrics.expense)}
        change={metrics.expenseChange}
        icon={<ExpenseIcon />}
      />
      <MetricCard
        title="Клики"
        value={metrics.clicks}
        change={metrics.clicksChange}
        icon={<ClickIcon />}
      />
      <MetricCard
        title="CPC"
        value={metrics.cpc}
        change={metrics.cpcChange}
        icon={<CpcIcon />}
      />
      <MetricCard
        title="CPA"
        value={`${metrics.cpa.toFixed(2)}$`}
        change={metrics.cpaChange}
        icon={<CpaIcon />}
      />
    </div>
  );
};
