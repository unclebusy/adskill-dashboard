import { Offer, PlatformType } from '../../types/types';
import { PlatformIcon } from '../ui/PlatformIcon';
import { Checkbox } from '../ui/Checkbox';
import './TotalOfferExpanded.css';

interface TotalOfferExpandedProps {
  offers: Offer[];
}

interface AggregatedPlatform {
  type: PlatformType;
  balance: number;
  accounts: number;
  avgCpc: number;
  avgCpa: number;
}

export const TotalOfferExpanded = ({ offers }: TotalOfferExpandedProps) => {
  const aggregatePlatforms = (): AggregatedPlatform[] => {
    const platformMap = new Map<PlatformType, { balance: number; accounts: number; cpcSum: number; cpaSum: number; count: number }>();

    offers.forEach(offer => {
      offer.platformDetails.forEach(platform => {
        const existing = platformMap.get(platform.type);
        if (existing) {
          existing.balance += platform.balance;
          existing.accounts += platform.accounts;
          existing.cpcSum += platform.avgCpc;
          existing.cpaSum += platform.avgCpa;
          existing.count += 1;
        } else {
          platformMap.set(platform.type, {
            balance: platform.balance,
            accounts: platform.accounts,
            cpcSum: platform.avgCpc,
            cpaSum: platform.avgCpa,
            count: 1,
          });
        }
      });
    });

    return Array.from(platformMap.entries()).map(([type, data]) => ({
      type,
      balance: data.balance,
      accounts: data.accounts,
      avgCpc: data.cpcSum / data.count,
      avgCpa: data.cpaSum / data.count,
    }));
  };

  const aggregatedPlatforms = aggregatePlatforms();

  const totalBalance = aggregatedPlatforms.reduce((sum, p) => sum + p.balance, 0);
  const totalAccounts = aggregatedPlatforms.reduce((sum, p) => sum + p.accounts, 0);

  const formatBalance = (value: number) => {
    return '$ ' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
  };

  return (
    <div className="total-offer-expanded">
      <div className="total-offer-expanded__left">
        <div className="total-offer-expanded__balance">
          <span className="total-offer-expanded__balance-label">Общий баланс</span>
          <span className="total-offer-expanded__balance-value">{formatBalance(totalBalance)}</span>
        </div>
        <div className="total-offer-expanded__info">
          <div className="total-offer-expanded__info-row">
            <span className="total-offer-expanded__info-label">Выбрано офферов:</span>
            <span className="total-offer-expanded__info-value">{offers.length}</span>
          </div>
          <div className="total-offer-expanded__info-row">
            <span className="total-offer-expanded__info-label">Всего аккаунтов:</span>
            <span className="total-offer-expanded__info-value">{totalAccounts}</span>
          </div>
          <div className="total-offer-expanded__info-row">
            <span className="total-offer-expanded__info-label">Площадок:</span>
            <span className="total-offer-expanded__info-value">{aggregatedPlatforms.length}</span>
          </div>
        </div>
      </div>

      <div className="total-offer-expanded__right">
        <h3 className="total-offer-expanded__platforms-title">Все рекламные площадки</h3>
        <table className="total-platforms-table">
          <thead>
            <tr>
              <th></th>
              <th>Площадки ⇅</th>
              <th>Баланс ⇅</th>
              <th>Аккаунтов ⇅</th>
              <th>AVG CPC ⇅</th>
              <th>AVG CPA ⇅</th>
            </tr>
          </thead>
          <tbody>
            {aggregatedPlatforms.map((platform) => (
              <tr key={platform.type}>
                <td>
                  <Checkbox onChange={() => {}} />
                </td>
                <td>
                  <div className="platform-cell">
                    <PlatformIcon platform={platform.type} size="small" />
                  </div>
                </td>
                <td>${platform.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td>{platform.accounts}</td>
                <td>${platform.avgCpc.toFixed(2)}</td>
                <td>${platform.avgCpa.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
