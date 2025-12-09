import { Offer } from '../../types/types';
import { PlatformIcon } from '../ui/PlatformIcon';
import { Checkbox } from '../ui/Checkbox';
import './OfferExpandedRow.css';

interface OfferExpandedRowProps {
  offer: Offer;
}

export const OfferExpandedRow = ({ offer }: OfferExpandedRowProps) => {
  const formatBalance = (value: number) => {
    return '$ ' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="offer-expanded">
      <div className="offer-expanded__left">
        <div className="offer-expanded__balance">
          <span className="offer-expanded__balance-label">Баланс</span>
          <span className="offer-expanded__balance-value">{formatBalance(150345)}</span>
        </div>
        <div className="offer-expanded__info">
          <div className="offer-expanded__info-row">
            <span className="offer-expanded__info-label">Дата запуска:</span>
            <span className="offer-expanded__info-value">{formatDate(offer.launchDate)}</span>
          </div>
          <div className="offer-expanded__info-row">
            <span className="offer-expanded__info-label">Направление:</span>
            <span className="offer-expanded__info-value">{offer.direction}</span>
          </div>
          <div className="offer-expanded__info-row">
            <span className="offer-expanded__info-label">Объект:</span>
            <span className="offer-expanded__info-value">{offer.object}</span>
          </div>
          <div className="offer-expanded__info-row">
            <span className="offer-expanded__info-label">Цель:</span>
            <span className="offer-expanded__info-value">{offer.goal}</span>
          </div>
          <div className="offer-expanded__info-row">
            <span className="offer-expanded__info-label">Трекер:</span>
            <span className="offer-expanded__info-value">{offer.tracker}</span>
          </div>
          <div className="offer-expanded__info-row">
            <span className="offer-expanded__info-label">Гео:</span>
            <span className="offer-expanded__info-value">{offer.geo.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className="offer-expanded__right">
        <h3 className="offer-expanded__platforms-title">Рекламные площадки</h3>
        <table className="platforms-table">
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
            {offer.platformDetails.map((platform) => (
              <tr key={platform.id}>
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
