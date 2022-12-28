import {createSlice} from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    filterArticles: [],
    searchInput: '',
    articleStatus: '',
    error: null,
    loading: false,
    checkedEmpty: [],
  },
  reducers: {
    articlesReq(state) {
      state.loading = true;
    },
    allArticlesSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.articleStatus = 'success';
      state.checkedEmpty = action.payload;
      state.articles = [...state.articles, ...action.payload];
    },
    allArticlesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.articleStatus = 'failed';
    },
    refresh(state) {
      state.articles = [];
      state.checkedEmpty = [];
      state.articleStatus = '';
      state.filterArticles = [];
      state.searchInput = '';
      state.error = null;
    },
    searchArticles(state, action) {
      state.searchInput = action.payload;
      state.filterArticles = state.articles.filter(article => {
        return (
          article.abstract
            .toString()
            .toLowerCase()
            .match(action.payload.toString().toLowerCase()) ||
          article.headline.main
            .toString()
            .toLowerCase()
            .match(action.payload.toString().toLowerCase())
        );
      });
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice;
