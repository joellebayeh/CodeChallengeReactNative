import axios from 'axios';
import {articleActions} from '../slices/article-slice';

export const getAllArticles = page => {
  return async (dispatch, getState) => {
    const token = getState().login.accessToken;
    console.log('token:', token);
    console.log('page', page);
    console.log('i am in the function');
    dispatch(articleActions.articlesReq());
    await axios
      .get('http://34.245.213.76:3000/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      })
      .then(res => {
        // console.log(res.data.response.docs)
        dispatch(articleActions.allArticlesSuccess(res.data.response.docs));
      })
      .catch(err => {
        dispatch(articleActions.allArticlesFailed(err.message));
      });
  };
};
