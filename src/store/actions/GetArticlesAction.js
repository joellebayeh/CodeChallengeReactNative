import axios from 'axios';
import {articleActions} from '../slices/article-slice';
import config from '../../../config';

export const getAllArticles = page => {
  return async (dispatch, getState) => {
    const token = getState().login.accessToken;
    dispatch(articleActions.articlesReq());
    await axios
      .get(config.ARTICLE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })
      .then(res => {
        dispatch(articleActions.allArticlesSuccess(res.data.response.docs));
      })
      .catch(err => {
        dispatch(articleActions.allArticlesFailed(err.message));
      });
  };
};
