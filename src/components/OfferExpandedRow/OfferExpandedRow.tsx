import { Offer } from '../../types/types';
import { PlatformsTable } from '../ui/PlatformsTable';
import { formatBalance, formatDateRu } from '../../utils/formatters';
import './OfferExpandedRow.css';

interface OfferExpandedRowProps {
  offer: Offer;
}

export const OfferExpandedRow = ({ offer }: OfferExpandedRowProps) => {
  const totalBalance = offer.platformDetails.reduce((sum, platform) => sum + platform.balance, 0);

  return (
    <div className="offer-expanded">
      <div className="offer-expanded__left">
        <div className="offer-expanded__balance">
          <span className="offer-expanded__balance-label">Баланс</span>
          <span className="offer-expanded__balance-value">{formatBalance(totalBalance)}</span>
        </div>
        <div className="offer-expanded__info">
          <div className="offer-expanded__info-row">
            <span className="offer-expanded__info-label">Дата запуска:</span>
            <span className="offer-expanded__info-value">{formatDateRu(offer.launchDate)}</span>
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
        <PlatformsTable platforms={offer.platformDetails} />
      </div>
    </div>
  );
};
