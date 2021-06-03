import articleReducer, {
  ArticleState,
} from './articleSlice';

describe('article reducer', () => {
  const initialState: ArticleState = {
    loading: false,
    selectedItem: null,
    articles: null
  };
  it('should handle initial state', () => {
    expect(articleReducer(undefined, { type: 'unknown' })).toEqual({
      loading: false,
      selectedItem: null,
      articles: null
    });
  });

});
