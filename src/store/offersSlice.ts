import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OffersState } from '../types/types';
import { mockOffers } from '../data/mockData';

const initialState: OffersState = {
  items: [],
  selectedIds: [],
  sortColumn: null,
  sortDirection: 'asc',
  loading: false,
  error: null,
  selectedOffer: null,
  expandedOfferId: null,
};

export const fetchOffers = createAsyncThunk<Offer[], void, { rejectValue: string }>(
  'offers/fetchOffers',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockOffers;
    } catch {
      return rejectWithValue('Не удалось загрузить офферы');
    }
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    toggleSelectOffer: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);
      if (index === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },
    selectAllOffers: (state) => {
      if (state.selectedIds.length === state.items.length) {
        state.selectedIds = [];
      } else {
        state.selectedIds = state.items.map((offer) => offer.id);
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
    setSortColumn: (state, action: PayloadAction<keyof Offer>) => {
      const column = action.payload;
      if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = column;
        state.sortDirection = 'asc';
      }
    },
    setSelectedOffer: (state, action: PayloadAction<Offer | null>) => {
      state.selectedOffer = action.payload;
    },
    toggleExpandedOffer: (state, action: PayloadAction<string>) => {
      if (state.expandedOfferId === action.payload) {
        state.expandedOfferId = null;
      } else {
        state.expandedOfferId = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const {
  toggleSelectOffer,
  selectAllOffers,
  clearSelection,
  setSortColumn,
  setSelectedOffer,
  toggleExpandedOffer,
  clearError,
} = offersSlice.actions;

export default offersSlice.reducer;
