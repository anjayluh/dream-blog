import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ArticleReducer from '../modules/article/articleSlice';

export const store = configureStore({
  reducer: {
    article: ArticleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
