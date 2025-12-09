import { useMemo, Fragment } from 'react';
import { Offer } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSelectOffer, selectAllOffers, setSortColumn, toggleExpandedOffer } from '../../store/offersSlice';
import { Checkbox } from '../ui/Checkbox';
import { Badge } from '../ui/Badge';
import { PlatformIcon } from '../ui/PlatformIcon';
import { OfferExpandedRow } from '../OfferExpandedRow';
import { formatCurrency, formatDate } from '../../utils/formatters';
import './OffersTable.css';
import {ExportIcon, MoreIcon, ChevronRightIcon} from "@/components/ui/Icons";
import {FilterButton} from "@/components/ui/FilterButton";

interface OffersTableProps {
  offers: Offer[];
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

export const OffersTable = ({ offers }: OffersTableProps) => {
  const dispatch = useAppDispatch();
  const { selectedIds, sortColumn, sortDirection, expandedOfferId } = useAppSelector((state) => state.offers);

  const sortedOffers = useMemo(() => {
    if (!sortColumn) return offers;

    return [...offers].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (Array.isArray(aValue) && Array.isArray(bValue)) {
        comparison = aValue.join(',').localeCompare(bValue.join(','));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [offers, sortColumn, sortDirection]);

  const isAllSelected = selectedIds.length === offers.length && offers.length > 0;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < offers.length;

  const handleSort = (column: keyof Offer) => {
    dispatch(setSortColumn(column));
  };

  const handleSelectAll = () => {
    dispatch(selectAllOffers());
  };

  const handleRowClick = (offerId: string) => {
    dispatch(toggleExpandedOffer(offerId));
  };

  const renderSortIcon = (column: keyof Offer) => {
    if (sortColumn !== column) {
      return <span className="sort-icon sort-icon--inactive">⇅</span>;
    }
    return (
      <span className="sort-icon sort-icon--active">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="offers-table-wrapper">
      <div className="offers-table-header">
        <h2 className="offers-table-title">Офферы</h2>
        <FilterButton icon={<ExportIcon />}>Экспорт</FilterButton>
      </div>
      <table className="offers-table">
        <thead>
          <tr>
            <th className="offers-table__checkbox-cell">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={handleSelectAll}
              />
            </th>
            <th onClick={() => handleSort('name')} className="sortable">
              Название оффера {renderSortIcon('name')}
            </th>
            <th onClick={() => handleSort('platforms')} className="sortable">
              Площадки {renderSortIcon('platforms')}
            </th>
            <th onClick={() => handleSort('launchDate')} className="sortable">
              Дата запуска {renderSortIcon('launchDate')}
            </th>
            <th onClick={() => handleSort('balance')} className="sortable">
              Баланс {renderSortIcon('balance')}
            </th>
            <th onClick={() => handleSort('expense')} className="sortable">
              Расход {renderSortIcon('expense')}
            </th>
            <th onClick={() => handleSort('status')} className="sortable">
              Статус {renderSortIcon('status')}
            </th>
            <th className="offers-table__actions-cell"></th>
          </tr>
        </thead>
        <tbody>
          {sortedOffers.map((offer) => (
            <Fragment key={offer.id}>
              <tr
                className={`offers-table__row ${selectedIds.includes(offer.id) ? 'offers-table__row--selected' : ''} ${expandedOfferId === offer.id ? 'offers-table__row--expanded' : ''}`}
                onClick={() => handleRowClick(offer.id)}
              >
                <td className="offers-table__checkbox-cell" onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={selectedIds.includes(offer.id)} onChange={() => dispatch(toggleSelectOffer(offer.id))} />
                </td>
                <td className="offers-table__name-cell">
                  <div className="offer-name-wrapper">
                    <span className={`expand-icon ${expandedOfferId === offer.id ? 'expand-icon--expanded' : ''}`}>
                      <ChevronRightIcon />
                    </span>
                    <span className="offer-name">{offer.name}</span>
                  </div>
                </td>
                <td>
                  <div className="platforms-cell">
                    {offer.platforms.map((platform) => (
                      <PlatformIcon key={platform} platform={platform} size="small" />
                    ))}
                  </div>
                </td>
                <td>{formatDate(offer.launchDate)}</td>
                <td className="offers-table__money-cell">
                  {formatCurrency(offer.balance, offer.currency)}
                </td>
                <td className="offers-table__money-cell">
                  {formatCurrency(offer.expense, offer.currency)}
                </td>
                <td>
                  <Badge variant={getStatusVariant(offer.status)}>{getStatusLabel(offer.status)}</Badge>
                </td>
                <td className="offers-table__actions-cell">
                  <button className="actions-btn" onClick={(e) => e.stopPropagation()}>
                    <MoreIcon />
                  </button>
                </td>
              </tr>
              {expandedOfferId === offer.id && (
                <tr className="offers-table__expanded-row">
                  <td colSpan={8}>
                    <OfferExpandedRow offer={offer} />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>

      <div className="offers-cards">
        {sortedOffers.map((offer) => (
          <div
            key={offer.id}
            className={`offer-card ${selectedIds.includes(offer.id) ? 'offer-card--selected' : ''} ${expandedOfferId === offer.id ? 'offer-card--expanded' : ''}`}
            onClick={() => handleRowClick(offer.id)}
          >
            <div className="offer-card__header">
              <div className="offer-card__checkbox" onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={selectedIds.includes(offer.id)} onChange={() => dispatch(toggleSelectOffer(offer.id))} />
              </div>
              <div className="offer-card__title">
                <span className={`expand-icon ${expandedOfferId === offer.id ? 'expand-icon--expanded' : ''}`}>
                  <ChevronRightIcon />
                </span>
                <span className="offer-name">{offer.name}</span>
              </div>
              <Badge variant={getStatusVariant(offer.status)}>{getStatusLabel(offer.status)}</Badge>
            </div>
            <div className="offer-card__body">
              <div className="offer-card__row">
                <span className="offer-card__label">Площадки</span>
                <div className="platforms-cell">
                  {offer.platforms.map((platform) => (
                    <PlatformIcon key={platform} platform={platform} size="small" />
                  ))}
                </div>
              </div>
              <div className="offer-card__row">
                <span className="offer-card__label">Дата запуска</span>
                <span className="offer-card__value">{formatDate(offer.launchDate)}</span>
              </div>
              <div className="offer-card__row">
                <span className="offer-card__label">Баланс</span>
                <span className="offer-card__value">{formatCurrency(offer.balance, offer.currency)}</span>
              </div>
              <div className="offer-card__row">
                <span className="offer-card__label">Расход</span>
                <span className="offer-card__value">{formatCurrency(offer.expense, offer.currency)}</span>
              </div>
            </div>
            {expandedOfferId === offer.id && (
              <div className="offer-card__expanded">
                <OfferExpandedRow offer={offer} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
