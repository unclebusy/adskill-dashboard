import { configureStore } from '@reduxjs/toolkit';
import offersReducer from './offersSlice';
import metricsReducer from './metricsSlice';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    metrics: metricsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
