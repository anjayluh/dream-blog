import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../redux/store';
import axios from 'axios';

export interface ArticleState {
  selectedItem: any | null;
  loading: boolean;
  articles: any[] | null;
}

const initialState: ArticleState = {
  loading: false,
  selectedItem: null,
  articles: null,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setArticles: (state, action: PayloadAction<any>) => {
      state.articles = action.payload;
    }
  },
});

export const { setArticles } = articleSlice.actions;

export default articleSlice.reducer;
