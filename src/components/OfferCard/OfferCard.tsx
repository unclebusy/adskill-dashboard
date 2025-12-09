import { Offer } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSelectOffer } from '../../store/offersSlice';
import { Checkbox } from '../ui/Checkbox';
import { Badge } from '../ui/Badge';
import { PlatformIcon } from '../ui/PlatformIcon';
import { formatCurrency, formatDate } from '../../utils/formatters';
import './OfferCard.css';

interface OfferCardProps {
  offer: Offer;
  onClick: () => void;
}

const getStatusVariant = (status: Offer['status']) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'stopped':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: Offer['status']) => {
  switch (status) {
    case 'active':
      return 'Активный';
    case 'stopped':
      return 'Остановлен';
    default:
      return status;
  }
};

export const OfferCard = ({ offer, onClick }: OfferCardProps) => {
  const dispatch = useAppDispatch();
  const { selectedIds } = useAppSelector((state) => state.offers);
  const isSelected = selectedIds.includes(offer.id);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleSelectOffer(offer.id));
  };

  return (
    <div
      className={`offer-card ${isSelected ? 'offer-card--selected' : ''}`}
      onClick={onClick}
    >
      <div className="offer-card__header">
        <div className="offer-card__checkbox" onClick={handleCheckboxClick}>
          <Checkbox checked={isSelected} onChange={() => {}} />
        </div>
        <div className="offer-card__title-wrapper">
          <h3 className="offer-card__title">{offer.name}</h3>
          <div className="offer-card__platforms">
            {offer.platforms.map((platform) => (
              <PlatformIcon key={platform} platform={platform} size="small" />
            ))}
          </div>
        </div>
        <Badge variant={getStatusVariant(offer.status)}>{getStatusLabel(offer.status)}</Badge>
      </div>

      <div className="offer-card__metrics">
        <div className="offer-card__metric">
          <span className="offer-card__metric-label">Дата запуска</span>
          <span className="offer-card__metric-value">{formatDate(offer.launchDate)}</span>
        </div>
        <div className="offer-card__metric">
          <span className="offer-card__metric-label">Баланс</span>
          <span className="offer-card__metric-value offer-card__metric-value--highlight">
            {formatCurrency(offer.balance, offer.currency)}
          </span>
        </div>
        <div className="offer-card__metric">
          <span className="offer-card__metric-label">Расход</span>
          <span className="offer-card__metric-value">
            {formatCurrency(offer.expense, offer.currency)}
          </span>
        </div>
        <div className="offer-card__metric">
          <span className="offer-card__metric-label">Направление</span>
          <span className="offer-card__metric-value">{offer.direction}</span>
        </div>
      </div>
    </div>
  );
};
