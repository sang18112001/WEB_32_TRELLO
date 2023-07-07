import { configureStore } from '@reduxjs/toolkit';
import { getIssues, trelloReducer } from './trelloReducer';
import trelloAPI from '../api/trelloAPI';

export const store = configureStore({
  reducer: {
    trelloReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const getTrello = (state: RootState) => state.trelloReducer;

trelloAPI.getIssues().then((response) => {
  const data = response ? response.issues : [];
  store.dispatch(getIssues(data));
});
