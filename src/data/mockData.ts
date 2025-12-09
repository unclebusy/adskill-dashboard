import { Offer, MetricsState, Platform } from '../types/types';

const createOffer = (
  id: string,
  name: string,
  launchDate: string,
  balance: number,
  expense: number,
  status: 'active' | 'stopped',
  currency: string,
  direction: string,
  object: string,
  goal: string,
  tracker: string,
  geo: string[],
  platformDetails: Platform[]
): Offer => ({
  id,
  name,
  platforms: platformDetails.map(p => p.type),
  launchDate,
  balance,
  expense,
  status,
  currency,
  direction,
  object,
  goal,
  tracker,
  geo,
  platformDetails,
});

export const mockOffers: Offer[] = [
  createOffer(
    '1',
    'Продажа мебели',
    '2025-06-23',
    15423.00,
    15423.00,
    'active',
    'USD',
    'E-Commerce',
    'App',
    'CPA',
    'AppsFlyer',
    ['RU', 'UA', 'KZ'],
    [
      { id: '1-1', type: 'google', balance: 15423.00, accounts: 12, avgCpc: 0.32, avgCpa: 5.32 },
      { id: '1-2', type: 'googleAds', balance: 12500.00, accounts: 8, avgCpc: 0.25, avgCpa: 4.10 },
      { id: '1-3', type: 'applovin', balance: 8200.00, accounts: 5, avgCpc: 0.18, avgCpa: 3.45 },
    ]
  ),
  createOffer(
    '2',
    'Стулья 2.0',
    '2025-06-23',
    15423.00,
    15423.00,
    'stopped',
    'USD',
    'E-Commerce',
    'Website',
    'CPC',
    'Adjust',
    ['RU'],
    [
      { id: '2-1', type: 'vk', balance: 8500.00, accounts: 5, avgCpc: 0.15, avgCpa: 3.20 },
      { id: '2-2', type: 'telegram', balance: 6923.00, accounts: 3, avgCpc: 0.08, avgCpa: 1.85 },
    ]
  ),
];

export const mockMetrics: MetricsState = {
  expense: 15423.00,
  expenseChange: 24,
  clicks: 323,
  clicksChange: 100,
  cpc: 4,
  cpcChange: -2,
  cpa: 4.44,
  cpaChange: -3,
};
