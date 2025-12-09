export type OfferStatus = 'active' | 'stopped';

export type PlatformType = 'google' | 'googleAds' | 'vk' | 'telegram' | 'applovin';

export interface Platform {
  id: string;
  type: PlatformType;
  balance: number;
  accounts: number;
  avgCpc: number;
  avgCpa: number;
}

export interface Offer {
  id: string;
  name: string;
  platforms: PlatformType[];
  launchDate: string;
  balance: number;
  expense: number;
  status: OfferStatus;
  currency: string;
  direction: string;
  object: string;
  goal: string;
  tracker: string;
  geo: string[];
  platformDetails: Platform[];
}

export interface OffersState {
  items: Offer[];
  selectedIds: string[];
  sortColumn: keyof Offer | null;
  sortDirection: 'asc' | 'desc';
  loading: boolean;
  error: string | null;
  selectedOffer: Offer | null;
  expandedOfferId: string | null;
}

export interface MetricsState {
  expense: number;
  expenseChange: number;
  clicks: number;
  clicksChange: number;
  cpc: number;
  cpcChange: number;
  cpa: number;
  cpaChange: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  column: keyof Offer | null;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => JSX.Element | string | number | null;
  width?: string;
}
