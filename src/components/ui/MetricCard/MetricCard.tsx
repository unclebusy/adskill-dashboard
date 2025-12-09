import { ReactNode } from 'react';
import { ArrowUpIcon } from '../Icons/ArrowUpIcon';
import { ArrowDownIcon } from '../Icons/ArrowDownIcon';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon?: ReactNode;
}

export const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  const isPositive = change >= 0;
  const changeClass = isPositive ? 'metric-card__change--positive' : 'metric-card__change--negative';

  return (
    <div className="metric-card">
      <div className="metric-card__header">
        <span className="metric-card__title">{title}</span>
        <div className="metric-card__icon">{icon}</div>
      </div>
      <div className="metric-card__content">
        <span className="metric-card__value">{value}</span>
        <span className={`metric-card__change ${changeClass}`}>
          {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
};
