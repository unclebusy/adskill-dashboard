import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOffers, toggleExpandedOffer } from '../../store/offersSlice';
import { fetchMetrics } from '../../store/metricsSlice';
import { Header } from '../../components/Header';
import { MetricsCards } from '../../components/MetricsCards';
import { OffersTable } from '../../components/OffersTable';
import { OfferCard } from '../../components/OfferCard';
import { OfferExpandedRow } from '../../components/OfferExpandedRow';
import { TotalOfferExpanded } from '../../components/TotalOfferExpanded';
import { DashboardLoading } from '../../components/DashboardLoading';
import { DashboardError } from '../../components/DashboardError';
import './Dashboard.css';

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { items: offers, loading, error, expandedOfferId, selectedIds } = useAppSelector((state) => state.offers);
  
  const selectedOffers = offers.filter(offer => selectedIds.includes(offer.id));

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(fetchMetrics());
  }, [dispatch]);

  const handleCardClick = (offerId: string) => {
    dispatch(toggleExpandedOffer(offerId));
  };

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError error={error} onRetry={() => dispatch(fetchOffers())} />;
  }

  const expandedOffer = offers.find(o => o.id === expandedOfferId);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Header />
        <MetricsCards />
        <OffersTable offers={offers} />
        
        <div className="offer-cards-list">
          <div className="offer-cards-header">
            <h2 className="offer-cards-title">Офферы</h2>
          </div>
          {offers.map((offer) => (
            <div key={offer.id}>
              <OfferCard
                offer={offer}
                onClick={() => handleCardClick(offer.id)}
              />
              {expandedOfferId === offer.id && expandedOffer && (
                <div className="offer-card-expanded">
                  <OfferExpandedRow offer={expandedOffer} />
                </div>
              )}
            </div>
          ))}
        </div>

        <TotalOfferExpanded offers={selectedOffers.length > 0 ? selectedOffers : offers} />
      </div>
    </div>
  );
};
